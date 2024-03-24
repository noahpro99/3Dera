from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import uvicorn
import make_scene

app = FastAPI(
    title="Objaverse API",
    version="0.1.0",
    description="API for creating historical scenes in Blender",
    docs_url="/",
)

available_scenes = [
    "Moon Landing",
    "Spanish Expedition to Americas",
    "Boston Massacre",
    "Titanic Sinking",
    "Pyramids of Giza",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)


class RequestModelInput(BaseModel):
    text: str
    date: str
    location: str


@app.post("/create_scene")
async def create_scene(request: RequestModelInput):
    scene_query = f"{request.date} {request.text}"
    if request.text not in available_scenes:
        return JSONResponse(content={"message": "Scene not available!"})
    print(scene_query)
    make_scene.create_scene(
        scene_query,
        r"C:\Program Files (x86)\Steam\steamapps\common\Blender",
        "./output.blend",
    )
    subprocess.Popen(
        [
            "powershell.exe",
            "-Command",
            "& 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Blender\\blender.exe' .\\output.blend",
        ]
    )

    return JSONResponse(content={"message": "Scene created!"})


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
