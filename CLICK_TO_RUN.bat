@echo off
title PRODUCTIVITY CRIME BRANCH - Government of Lost Time
echo ====================================================================
echo   PRODUCTIVITY CRIME BRANCH - GOVERNMENT OF LOST TIME
echo   Federal Department of Temporal Mismanagement
echo ====================================================================
echo.
echo Starting application on http://localhost:5173 ...
start "" "http://localhost:5173"
call npm run dev -- --host --port 5173
pause
