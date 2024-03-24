import os
from openai import OpenAI
import wikipedia
import argparse

client = OpenAI()


def get_wiki_page(query: str) -> str:
    result = wikipedia.search(query, results=1)[0]
    print(f"Found wikipedia page for {query}: {result}")
    return wikipedia.page(result).content


def create_wiki_audio(query: str) -> str:
    """Generate audio file from wikipedia page

    Args:
        query (str): Query to search on wikipedia

    Returns:
        str: Path to generated audio file
    """
    text = get_wiki_page(query)
    summary = summarize_text(text)
    audio_file = get_audio_file(summary)
    return audio_file


def summarize_text(text: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": "You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the following text and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points.",
            },
            {"role": "user", "content": text[:10000]},
        ],
    )
    return response.choices[0].message.content


def get_audio_file(text: str) -> str:
    response = client.audio.speech.create(
        model="tts-1",
        voice="echo",
        input=text,
    )

    if not os.path.exists("audio"):
        os.makedirs("audio")
    audio_number = len(os.listdir("audio")) + 1
    audio_file_path = f"audio/audio_{audio_number}.mp3"
    response.write_to_file(audio_file_path)
    return audio_file_path


def main():
    parser = argparse.ArgumentParser(
        description="Generate audio file from wikipedia page"
    )
    parser.add_argument("query", type=str, help="Query to search on wikipedia")
    args = parser.parse_args()
    query = args.query
    audio_file = create_wiki_audio(query)


if __name__ == "__main__":
    main()
