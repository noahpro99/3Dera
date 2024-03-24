import sys
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer


if __name__ == "__main__":
    qc = QdrantClient("localhost", port=6333)
    encoder = SentenceTransformer("all-MiniLM-L6-v2")

    def get_embedding(text: str) -> list:
        embedding = encoder.encode(text).tolist()
        return embedding

    res = qc.search(
        collection_name="annotations",
        query_vector=get_embedding(sys.argv[1]),
    )

    print(res)
