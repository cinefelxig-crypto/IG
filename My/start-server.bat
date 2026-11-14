@echo off
title SWASTIK 24/7 Autonomous Command Server
cd /d "%~dp0"
echo ====================================================
echo  SWASTIK 24/7 AUTONOMOUS OUTREACH & TELEGRAM ENGINE
echo ====================================================
echo  This server keeps your Telegram Boss Bot active 24/7
echo  even when your browser tab is CLOSED!
echo.
echo  Web Dashboard: http://localhost:3000
echo  Press Ctrl+C to stop.
echo ====================================================
node server.js
pause
