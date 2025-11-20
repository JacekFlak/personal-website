#!/usr/bin/env python3
"""
Technology Usage Analyzer

This script analyzes the repository to determine the percentage usage
of different technologies based on file types and lines of code.

Usage:
    python3 check_tech_usage.py [repository_path]
    
    If no repository_path is provided, it analyzes the parent directory
    of the script (assumes script is in a subdirectory of the repository).
"""

import os
import sys
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Tuple


# Mapping of file extensions to technology names
TECH_MAPPING = {
    '.py': 'Python',
    '.js': 'JavaScript',
    '.jsx': 'JavaScript (React)',
    '.ts': 'TypeScript',
    '.tsx': 'TypeScript (React)',
    '.html': 'HTML',
    '.htm': 'HTML',
    '.css': 'CSS',
    '.scss': 'SCSS',
    '.sass': 'Sass',
    '.less': 'Less',
    '.java': 'Java',
    '.c': 'C',
    '.cpp': 'C++',
    '.cc': 'C++',
    '.cxx': 'C++',
    '.h': 'C/C++ Header',
    '.hpp': 'C++ Header',
    '.cs': 'C#',
    '.php': 'PHP',
    '.rb': 'Ruby',
    '.go': 'Go',
    '.rs': 'Rust',
    '.swift': 'Swift',
    '.kt': 'Kotlin',
    '.r': 'R',
    '.R': 'R',
    '.sql': 'SQL',
    '.sh': 'Shell',
    '.bash': 'Bash',
    '.zsh': 'Zsh',
    '.yml': 'YAML',
    '.yaml': 'YAML',
    '.json': 'JSON',
    '.xml': 'XML',
    '.md': 'Markdown',
    '.txt': 'Text',
    '.vue': 'Vue',
    '.svelte': 'Svelte',
    '.scala': 'Scala',
    '.pl': 'Perl',
    '.lua': 'Lua',
    '.dart': 'Dart',
}

# Directories to ignore
IGNORE_DIRS = {
    '.git', 'node_modules', '__pycache__', '.pytest_cache',
    'venv', 'env', '.env', 'dist', 'build', '.next',
    'coverage', '.coverage', 'htmlcov', 'vendor',
    '.vscode', '.idea', 'target', 'out', 'bin', 'obj'
}


def count_lines_in_file(file_path: Path) -> int:
    """
    Count the number of lines in a file.
    
    Args:
        file_path: Path to the file
        
    Returns:
        Number of lines in the file, or 0 if the file cannot be read
    """
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            return sum(1 for _ in f)
    except Exception:
        return 0


def should_ignore_dir(dir_path: Path) -> bool:
    """
    Check if a directory should be ignored.
    
    Args:
        dir_path: Path to the directory
        
    Returns:
        True if the directory should be ignored, False otherwise
    """
    return any(part in IGNORE_DIRS for part in dir_path.parts)


def analyze_repository(repo_path: Path) -> Dict[str, int]:
    """
    Analyze the repository and count lines of code by technology.
    
    Args:
        repo_path: Path to the repository root
        
    Returns:
        Dictionary mapping technology names to line counts
    """
    tech_lines = defaultdict(int)
    
    for root, dirs, files in os.walk(repo_path):
        root_path = Path(root)
        
        # Filter out ignored directories
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        # Skip if this directory should be ignored
        if should_ignore_dir(root_path):
            continue
        
        for file in files:
            file_path = root_path / file
            extension = file_path.suffix.lower()
            
            # Check if we recognize this file type
            if extension in TECH_MAPPING:
                technology = TECH_MAPPING[extension]
                line_count = count_lines_in_file(file_path)
                tech_lines[technology] += line_count
    
    return dict(tech_lines)


def calculate_percentages(tech_lines: Dict[str, int]) -> List[Tuple[str, int, float]]:
    """
    Calculate percentages for each technology.
    
    Args:
        tech_lines: Dictionary mapping technology names to line counts
        
    Returns:
        List of tuples containing (technology, lines, percentage)
        sorted by percentage in descending order
    """
    total_lines = sum(tech_lines.values())
    
    if total_lines == 0:
        return []
    
    percentages = [
        (tech, lines, (lines / total_lines) * 100)
        for tech, lines in tech_lines.items()
    ]
    
    # Sort by percentage in descending order
    percentages.sort(key=lambda x: x[2], reverse=True)
    
    return percentages


def print_results(percentages: List[Tuple[str, int, float]]) -> None:
    """
    Print the technology usage results in a formatted table.
    
    Args:
        percentages: List of tuples containing (technology, lines, percentage)
    """
    if not percentages:
        print("No technology files found in the repository.")
        return
    
    total_lines = sum(lines for _, lines, _ in percentages)
    
    print("=" * 60)
    print("Technology Usage Analysis")
    print("=" * 60)
    print(f"\nTotal lines of code: {total_lines:,}\n")
    print(f"{'Technology':<25} {'Lines':<12} {'Percentage':<10}")
    print("-" * 60)
    
    for tech, lines, percentage in percentages:
        bar_length = int(percentage / 2)  # Max 50 chars for 100%
        bar = "█" * bar_length
        print(f"{tech:<25} {lines:<12,} {percentage:>6.2f}%  {bar}")
    
    print("=" * 60)


def main():
    """Main entry point for the script."""
    # Get the repository path from command line argument or use default
    if len(sys.argv) > 1:
        repo_path = Path(sys.argv[1]).resolve()
    else:
        # Get the repository root (parent of the graph directory)
        script_dir = Path(__file__).parent
        repo_path = script_dir.parent
    
    if not repo_path.exists():
        print(f"Error: Repository path does not exist: {repo_path}")
        return 1
    
    print(f"Analyzing repository: {repo_path}\n")
    
    # Analyze the repository
    tech_lines = analyze_repository(repo_path)
    
    # Calculate percentages
    percentages = calculate_percentages(tech_lines)
    
    # Print results
    print_results(percentages)
    
    return 0 if percentages else 1


if __name__ == "__main__":
    sys.exit(main())
