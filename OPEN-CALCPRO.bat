@echo off
setlocal
cd /d "%~dp0"
set PORT=8000

where py >nul 2>&1
if %errorlevel%==0 (
  start "CalcPro Local Server" /min py -m http.server %PORT%
  timeout /t 2 /nobreak >nul
  start "" http://127.0.0.1:%PORT%/index.html
  exit /b 0
)

where python >nul 2>&1
if %errorlevel%==0 (
  start "CalcPro Local Server" /min python -m http.server %PORT%
  timeout /t 2 /nobreak >nul
  start "" http://127.0.0.1:%PORT%/index.html
  exit /b 0
)

echo Python was not found on this PC.
echo You can still open index.html directly, or install Python and run this file again.
start "" "%~dp0index.html"
pause
