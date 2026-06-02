@echo off
cd /d "%~dp0"
echo.
echo  Moon Monkey - local dev server
echo  Folder: %CD%
echo.
if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 exit /b 1
)
echo Starting Vite (browser should open automatically)...
echo Keep this window open while you use the site.
echo.
call npm run dev
pause
