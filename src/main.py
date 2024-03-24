from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import uvicorn
import make_scene
import play_history

app = FastAPI(
    title="Objaverse API",
    version="0.1.0",
    description="API for creating historical scenes in Blender",
    docs_url="/",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)


class RequestModelInput(BaseModel):
    text: str
    date: int


@app.post("/create_scene")
async def create_scene(request: RequestModelInput):
    scene_query = f"{request.date} {request.text}"
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

    audio_file = play_history.create_wiki_audio(request.text)

    subprocess.Popen(
        [
            "powershell.exe",
            "-Command",
            f"Start-Process -FilePath 'powershell.exe' -ArgumentList 'Start {audio_file}' -WindowStyle Minimized",
        ]
    )

    return JSONResponse(content={"message": "Scene created!"})


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
