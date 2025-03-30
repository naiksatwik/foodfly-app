#!/bin/bash

# Function to check internet connectivity
check_internet() {
    wget -q --spider http://google.com
    if [ $? -eq 0 ]; then
        return 0  # Internet is available
    else
        return 1  # No internet
    fi
}

# Function to find and kill process using a specific port
kill_process_on_port() {
    PORT=$1
    PID=$(lsof -ti:$PORT)  # Get process ID using the port
    if [ ! -z "$PID" ]; then
        echo "Stopping process on port $PORT (PID: $PID)..."
        kill -9 $PID
        echo "Port $PORT is now free."
    else
        echo "No process found running on port $PORT."
    fi
}

# Start function
start_services() {
    echo "Checking internet connection..."
    if check_internet; then
        echo "Internet is available. Starting services..."

        echo "Starting Backend..."
        cd /home/sat24/Documents/foodfly/backend || exit
        nohup npm run dev > backend.log 2>&1 &

        echo "Starting Frontend..."
        cd /home/sat24/Documents/foodfly/frontend || exit
        nohup npm run dev > frontend.log 2>&1 &

        # Wait for frontend to start
        sleep 5

        # Open frontend in default browser
        xdg-open http://localhost:5173 &

        echo "Frontend opened in browser. Both frontend and backend are running!"
    else
        echo "No internet connection detected. Please connect to the internet and try again."
    fi
}

# Stop function
stop_services() {
    echo "Stopping Backend..."
    kill_process_on_port 5000  # Backend runs on port 5000

    echo "Stopping Frontend..."
    kill_process_on_port 5173  # Frontend runs on Vite (port 5173)

    echo "Both frontend and backend have been stopped!"
}

# Main logic
if [ "$1" == "start" ]; then
    start_services
elif [ "$1" == "stop" ]; then
    stop_services
else
    echo "Usage: ./foodFly.sh start | stop"
fi

