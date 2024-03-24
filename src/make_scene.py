from io import BytesIO
import json
import os
import bpy
import objaverse
import argparse
from openai import OpenAI
from dotenv import load_dotenv
from PIL import Image
import requests

load_dotenv()
client = OpenAI()


def get_model_file(query: str, annotations: dict) -> str:
    query_annotation = [
        x["uid"] for x in list(annotations.values()) if query in x["name"].lower()
    ]
    if len(query_annotation) == 0:
        raise ValueError(f"Could not find model for {query}")
    objects = objaverse.load_objects(uids=[query_annotation[0]])

    return objects[query_annotation[0]]


def add_object_to_scene(
    query: str, annotations: dict, location: tuple = (0, 0, 0), scale_m: int = 1
):
    bpy.context.scene.unit_settings.system = "METRIC"
    file_path = get_model_file(query, annotations)
    before_objs = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=file_path)
    new_objs = list(set(bpy.data.objects) - before_objs)
    max_height = max([max(obj.dimensions.z, obj.dimensions.y) for obj in new_objs])
    scale_multiplier = scale_m / max_height
    parent = new_objs[0]
    while parent.parent:
        parent = parent.parent
    parent.name = query
    print(f"Max height: {max_height}, scale multiplier: {scale_multiplier}")

    parent.location = (
        location[0],
        location[1],
        location[2],
    )
    parent.scale = (
        scale_multiplier * parent.scale[0],
        scale_multiplier * parent.scale[1],
        scale_multiplier * parent.scale[2],
    )
    bpy.context.view_layer.update()

    # get lowest point
    lowest_point_world = None
    for new_obj in new_objs:
        try:
            for vertex in new_obj.data.vertices:
                global_vertex = new_obj.matrix_world @ vertex.co
                if lowest_point_world is None or global_vertex.z < lowest_point_world.z:
                    lowest_point_world = global_vertex
        except:
            pass
    print(f"lowest point world: {lowest_point_world}")
    print(f"scale multiplier: {scale_multiplier}")

    if lowest_point_world is not None:
        parent.location.z -= lowest_point_world.z


def get_models(scene_query: str) -> list[str]:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": """
Given these objects: lunar_module, astronaut, us_flag, moon_crater, spanish_ship, spanish_seagull, island, expedition_waves, colonial_house, british_soldier,
female_civilian, male_boston, iceberg, sinking_ship, lifeboat, arctic_penguin, pyramid, egyptian_temples, sphinx, egyptian_cart

I want you to become an object list generator. I will give you a historical event, and I want you to provide me a list of FOUR of these objects in the list provided that best fit the historical event I give you.
Only in the list provided.
For example, if I said "boston massacre" you would say "colonial_house" "british_soldier" "female_civilian" "male_boston" etc. Lastly, no repeat words.
For example if there is a "sinking_ship" and a "spanish_ship" only include one that is more accurate based on the context.
Only provide output in json and nothing else. Be ready to take a historical event.
""",
            },
            {"role": "user", "content": scene_query},
        ],
    )

    res = response.choices[0].message.content
    response_list = [i[1:-1] for i in res.split("[")[1].split("]")[0].split(", ")]
    return response_list


def get_placements(
    models: list[str], scene_query: str
) -> dict[str, list[dict[str, int]]]:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "user",
                "content": f"""
I want you to become a placement generator. I will give a list of objects to place in the scene and a query for the scene.
You will give me the coordinates in meters and height of where you would place each of these in a blender recreation of the scene.
Note that with the type of objects that you are using, y is the up and down axis.
MAKE SURE all of the distances and the height make sense in the context of the scene.
Place objects of similar type in similar locations, for example, all people in the same area, all buildings in the same area, etc.
For very large objects, make sure they are not too close to other objects.
Here is the format of the json output I want from you:

{{
<object_name>: [{{"x(m)": <int>, "y(m)": <int>, "z(m)":<int>, "height(m)":<int>}}, ...],
...
}}

If there are multiple of an object in the scene, please account for this as well by putting them in the array.
an example of a good output for the query "moon landing" and the objects "lunar_module", "astronaut", "us_flag", "moon_crater" would be:
Feel free to add multiple of the same objects based on the scene as well, for example multiple buildings for a town.
Add AT LEAST FIVE of each person (civilian, person, male, female, etc.) only in events of large crowds.
Add AT LEAST FIVE of each object (building, car, tree, etc.) excluding significant objects (e.g. Eiffel Tower, Statue of Liberty, Titanic, Sphinx, etc.)
Make sure it makes sense in the historical context of the event, for example, "moon landing" would only have one astronaut and one flag, but boston massacre would have multiple soldiers and civilians.
Make sure to not put anything too close x=0, y=0, z=0, as that is the center of the scene where the camera is.
{{
"lunar_module": [{{"x(m)": 5, "y(m)": 5, "z(m)": 0, "height(m)": 3}}],
"astronaut": [{{"x(m)": 1, "y(m)": -5, "z(m)": 0, "height(m)": 2}}],
"us_flag": [{{"x(m)": 1, "y(m)": 6, "z(m)": 0, "height(m)": 2}}],
"moon_crater": [
    {{"x(m)": 30, "y(m)": 10, "z(m)": 0, "height(m)": 10}},
    {{"x(m)": -10, "y(m)": 25, "z(m)": 0, "height(m)": 10}},
    {{"x(m)": -30, "y(m)": 50, "z(m)": 0, "height(m)": 10}},
    {{"x(m)": 20, "y(m)": -30, "z(m)": 0, "height(m)": 10}},
    ...,
]
}}

give the json output only
""",
            },
            {
                "role": "user",
                "content": f"""
models_to_place = {{ {models} }}

scene_query = "{scene_query}"
                """,
            },
        ],
    )

    res = response.choices[0].message.content
    json_res: dict[str, list[dict[str, int]]] = json.loads(res)
    return json_res


def get_skybox_query(scene_query: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": f"""
I want you to become my blender skybox prompt generator.
I am going to give you a historical event, and I want you to give me a query of words that describe the sky at the historical event.
For example, if I say "moon landing", the query you would give me is "night pitch black space stars".
Also for every query, start it with "360 view". For example "360 view night pitch black space stars".
Furthermore, I only want you to give me words describing the sky environment whether night or day, starry, sunny or clear and no objects or people related words, such as clothing, etc.
Don't let the scene details influence the skybox query, only the sky.
""",
            },
            {"role": "user", "content": scene_query},
        ],
    )
    res = response.choices[0].message.content
    return res


def get_skybox(
    skybox_query: str,
) -> str:
    response = requests.post(
        "https://api-inference.huggingface.co/models/artificialguybr/360Redmond",
        headers={"Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}"},
        json={
            "inputs": skybox_query,
        },
    )
    print(response)
    image = Image.open(BytesIO(response.content))
    if not os.path.exists("images"):
        os.makedirs("images")
    image_number = 1
    while os.path.exists(f"images/skybox-{image_number}.png"):
        image_number += 1
    image_filename = f"images/skybox-{image_number}.png"
    image.save(image_filename)
    return image_filename


def add_skybox_to_scene(skybox_file: str):
    im = bpy.data.images.load(os.path.abspath(skybox_file))
    bpy.context.scene.world.use_nodes = True
    tree = bpy.context.scene.world.node_tree
    tree.nodes.clear()
    bg = tree.nodes.new("ShaderNodeBackground")
    bg.inputs["Strength"].default_value = 1
    bg.inputs["Color"].default_value = (1, 1, 1, 1)
    tex = tree.nodes.new("ShaderNodeTexEnvironment")
    tex.image = im
    tree.links.new(bg.inputs["Color"], tex.outputs["Color"])
    world_output = tree.nodes.new("ShaderNodeOutputWorld")
    tree.links.new(world_output.inputs["Surface"], bg.outputs["Background"])


def get_ground_query(scene_query: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": f"""
I want you to become my blender query prompt generator.
I am going to give you a historical event, and I want you to give me a query of words that describe the GROUND of that historical event.
For example, if I say "moon landing", the query you would give me is "gray dark craters space rock".
Also for every query, start it with "pattern". For example "pattern gray dark craters rock".
Furthermore, I only want you to give me words describing the composition of a GROUND, for example dirt, stone, cobblestone, etc.
IF THE SCENE IS IN THE OCEAN OR IN WATER, SAY "ocean water pattern" AND NOTHING ELSE AFTER.
Only output the query and nothing else.
""",
            },
            {"role": "user", "content": scene_query},
        ],
    )
    res = response.choices[0].message.content
    return res


def get_ground(ground_query: str) -> str:
    response = requests.post(
        "https://api-inference.huggingface.co/models/dream-textures/texture-diffusion",
        headers={"Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}"},
        json={
            "inputs": ground_query,
        },
    )
    print(response)
    image = Image.open(BytesIO(response.content))
    if not os.path.exists("images"):
        os.makedirs("images")
    image_number = 1
    while os.path.exists(f"images/ground-{image_number}.png"):
        image_number += 1
    image_filename = f"images/ground-{image_number}.png"
    image.save(image_filename)
    return image_filename


def create_material_with_texture(obj, image):
    mat = bpy.data.materials.new(name=f"{obj.name}Material")
    obj.data.materials.append(mat)
    obj.active_material = mat
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    texture_node = mat.node_tree.nodes.new(type="ShaderNodeTexImage")
    texture_node.image = image
    texture_node.extension = "REPEAT"
    mat.node_tree.links.new(bsdf.inputs["Base Color"], texture_node.outputs["Color"])

    texture_coordinate = mat.node_tree.nodes.new(type="ShaderNodeTexCoord")
    mapping = mat.node_tree.nodes.new(type="ShaderNodeMapping")
    # set mapping scale
    mapping.inputs["Scale"].default_value = (50, 50, 50)
    mat.node_tree.links.new(
        texture_coordinate.outputs["Generated"], mapping.inputs["Vector"]
    )
    mat.node_tree.links.new(mapping.outputs["Vector"], texture_node.inputs["Vector"])


def add_ground_to_scene(ground_file: str):

    bpy.ops.mesh.primitive_plane_add(size=500, enter_editmode=False, location=(0, 0, 0))
    large_plane = bpy.context.object
    large_plane.name = "LargePlane"

    ground_image = bpy.data.images.load(os.path.abspath(ground_file))
    create_material_with_texture(large_plane, ground_image)


def load_annotations(uids: list[str], annotation_file: str) -> dict[str, dict]:
    if not os.path.exists(annotation_file):
        print("Downloading annotations...")
        annotations_all_fields = objaverse.load_annotations(uids)
        annotations = {
            k: {
                k2: v2
                for k2, v2 in v.items()
                if k2 in ["uid", "name", "tags", "viewerUrl"]
            }
            for k, v in annotations_all_fields.items()
        }
        with open(annotation_file, "w") as f:
            json.dump(annotations, f)
    else:
        print("Loading annotations from file...")
        with open(annotation_file, "r") as f:
            annotations = json.load(f)
    return annotations


def create_scene(scene_query: str, blender_path: str, output_path: str):
    bpy.app.binary_path = blender_path
    print(f"Using blender from {bpy.app.binary_path}")

    print("Loading annotations...")
    uids = objaverse.load_uids()
    annotations = load_annotations(uids, "annotations.json")

    print("Clearing scene...")
    for obj in bpy.data.objects:
        bpy.data.objects.remove(obj)

    print(f"Gathering models for {scene_query}...")
    models = get_models(scene_query)
    print(models)

    print(f"Getting placements for {models} in {scene_query}...")
    placements = get_placements(models, scene_query)
    print(placements)

    for model in models:
        for placement in placements[model]:
            try:
                add_object_to_scene(
                    model,
                    annotations,
                    location=(placement["x(m)"], placement["y(m)"], placement["z(m)"]),
                    scale_m=placement["height(m)"],
                )
                print(f"Added {model} to scene at {placement}")
            except Exception as e:
                print(f"Could not add {model} to scene at {placement} due to {e}")

    print("Getting skybox...")
    skybox_query = get_skybox_query(scene_query)
    print(skybox_query)
    skybox_file = get_skybox(skybox_query)
    print(f"Got skybox at {skybox_file}")
    add_skybox_to_scene(skybox_file)
    print("Added skybox to scene")

    print("Adding ground...")
    ground_query = get_ground_query(scene_query)
    print(ground_query)
    ground_file = get_ground(ground_query)
    print(f"Got ground at {ground_file}")
    add_ground_to_scene(ground_file)
    print("Added ground to scene")

    bpy.ops.wm.save_as_mainfile(filepath=output_path)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("query", type=str, help="query to search for")
    parser.add_argument(
        "--blender-path",
        type=str,
        help="path to blender",
        default=r"C:\Program Files (x86)\Steam\steamapps\common\Blender",
    )
    parser.add_argument(
        "--output-path",
        type=str,
        help="path to save the blend file",
        default="./output.blend",
    )
    args = parser.parse_args()

    create_scene(args.query, args.blender_path, args.output_path)


if __name__ == "__main__":
    main()
