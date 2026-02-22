#!/usr/bin/env python3
"""
Setup script for Linear Release Automation
"""

import os
import sys
from pathlib import Path

def main():
    """Setup the release automation"""
    
    print("🚀 Setting up Linear Release Automation...")
    
    # Create necessary directories
    output_dir = Path("output/releases")
    templates_dir = Path("templates")
    
    output_dir.mkdir(parents=True, exist_ok=True)
    templates_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"✅ Created directory: {output_dir}")
    print(f"✅ Created directory: {templates_dir}")
    
    # Copy environment file if it doesn't exist
    env_file = Path(".env")
    env_example = Path("env.example")
    
    if not env_file.exists() and env_example.exists():
        import shutil
        shutil.copy(env_example, env_file)
        print(f"✅ Created .env file from template")
        print("⚠️  Please edit .env file with your API keys:")
        print("   - LINEAR_API_KEY")
        print("   - LINEAR_TEAM_ID") 
        print("   - OPENAI_API_KEY")
    elif env_file.exists():
        print("✅ .env file already exists")
    else:
        print("❌ env.example not found")
    
    print("\n📋 Next steps:")
    print("1. Edit .env file with your API keys")
    print("2. Install dependencies: pip install -r requirements.txt")
    print("3. Run the automation: python main.py")
    print("\n🎉 Setup complete!")

if __name__ == "__main__":
    main()
