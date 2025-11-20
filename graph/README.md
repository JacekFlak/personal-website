# Technology Usage Analyzer

This directory contains a script that analyzes the repository to determine the percentage usage of different technologies based on file types and lines of code.

## Usage

To check the technology usage in the repository, run:

```bash
python3 graph/check_tech_usage.py
```

or directly execute the script:

```bash
./graph/check_tech_usage.py
```

You can also specify a custom repository path:

```bash
python3 graph/check_tech_usage.py /path/to/repository
```

## Output

The script will display:
- Total lines of code analyzed
- Each technology found in the repository
- Number of lines per technology
- Percentage of usage for each technology
- A visual bar chart representation

## Example Output

```
============================================================
Technology Usage Analysis
============================================================

Total lines of code: 1,234

Technology                Lines        Percentage
------------------------------------------------------------
JavaScript                500           40.52%  ████████████████████
Python                    400           32.41%  ████████████████
HTML                      200           16.21%  ████████
CSS                       134           10.86%  █████
============================================================
```

## Supported Technologies

The script recognizes the following technologies based on file extensions:

- **Python** (.py)
- **JavaScript** (.js, .jsx)
- **TypeScript** (.ts, .tsx)
- **HTML** (.html, .htm)
- **CSS** (.css, .scss, .sass, .less)
- **Java** (.java)
- **C/C++** (.c, .cpp, .cc, .cxx, .h, .hpp)
- **C#** (.cs)
- **PHP** (.php)
- **Ruby** (.rb)
- **Go** (.go)
- **Rust** (.rs)
- **Swift** (.swift)
- **Kotlin** (.kt)
- **R** (.r, .R)
- **SQL** (.sql)
- **Shell** (.sh, .bash, .zsh)
- **YAML** (.yml, .yaml)
- **JSON** (.json)
- **XML** (.xml)
- **Markdown** (.md)
- **Vue** (.vue)
- **Svelte** (.svelte)
- **Scala** (.scala)
- **Perl** (.pl)
- **Lua** (.lua)
- **Dart** (.dart)

## Ignored Directories

The script automatically ignores common directories that don't contain source code:
- `.git`
- `node_modules`
- `__pycache__`
- `venv`, `env`, `.env`
- `dist`, `build`, `.next`
- `coverage`, `.coverage`, `htmlcov`
- `vendor`
- `.vscode`, `.idea`
- `target`, `out`, `bin`, `obj`

## Requirements

- Python 3.6 or higher
- No external dependencies required (uses only Python standard library)
