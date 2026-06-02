#!/usr/bin/env python3
"""
Drop a YouTube URL into this folder and run:
  python3 get_transcript.py <URL>
Transcript + metadata will be saved as a .txt file.
"""

import sys
import re
import os
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
import subprocess
import json

def extract_video_id(url):
    patterns = [
        r"(?:v=|youtu\.be/|embed/|shorts/)([A-Za-z0-9_-]{11})",
    ]
    for p in patterns:
        m = re.search(p, url)
        if m:
            return m.group(1)
    return None

def get_metadata(url):
    try:
        result = subprocess.run(
            ["yt-dlp", "--dump-json", "--no-download", url],
            capture_output=True, text=True, timeout=30
        )
        if result.returncode == 0:
            data = json.loads(result.stdout)
            return {
                "title": data.get("title", "Unknown"),
                "channel": data.get("uploader", "Unknown"),
                "duration": data.get("duration_string", "Unknown"),
                "upload_date": data.get("upload_date", "Unknown"),
                "view_count": data.get("view_count", "Unknown"),
                "description": data.get("description", "")[:500],
            }
    except Exception:
        pass
    return {}

def get_transcript(video_id):
    api = YouTubeTranscriptApi()
    try:
        fetched = api.fetch(video_id, languages=['en'])
    except Exception:
        transcript_list = api.list(video_id)
        available = list(transcript_list)
        if not available:
            raise Exception("No transcripts available for this video.")
        fetched = available[0].fetch()
    formatter = TextFormatter()
    return formatter.format_transcript(fetched), fetched

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 get_transcript.py <YouTube URL>")
        sys.exit(1)

    url = sys.argv[1]
    video_id = extract_video_id(url)
    if not video_id:
        print("Could not extract video ID from URL.")
        sys.exit(1)

    print(f"Fetching metadata for {video_id}...")
    meta = get_metadata(url)

    print("Fetching transcript...")
    try:
        text, raw = get_transcript(video_id)
    except Exception as e:
        print(f"Transcript unavailable: {e}")
        sys.exit(1)

    output_file = os.path.join(os.path.dirname(__file__), f"{video_id}.txt")
    with open(output_file, "w") as f:
        f.write(f"URL: {url}\n")
        if meta:
            f.write(f"Title: {meta.get('title')}\n")
            f.write(f"Channel: {meta.get('channel')}\n")
            f.write(f"Duration: {meta.get('duration')}\n")
            f.write(f"Upload date: {meta.get('upload_date')}\n")
            f.write(f"Views: {meta.get('view_count')}\n")
            f.write(f"\nDescription (first 500 chars):\n{meta.get('description')}\n")
        f.write("\n" + "="*60 + "\n")
        f.write("FULL TRANSCRIPT\n")
        f.write("="*60 + "\n\n")
        f.write(text)

    print(f"\nSaved to: {output_file}")
    print(f"\n--- TRANSCRIPT PREVIEW (first 500 chars) ---\n{text[:500]}...")

if __name__ == "__main__":
    main()
