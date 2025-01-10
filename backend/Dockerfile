FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the backend files into the container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set the PORT environment variable
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Command to run the Flask app
CMD ["python", "app.py"]

