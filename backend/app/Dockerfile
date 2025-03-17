FROM python:3.12.2-slim
WORKDIR /app

# Copiar solo requirements.txt primero para aprovechar la caché de Docker
COPY requirements.txt .

# Solucionar el problema de dependencias
RUN pip uninstall -y bson pymongo || true
RUN pip install pymongo==4.6.0 --no-deps
RUN pip install --no-cache-dir -r requirements.txt

# Verificar que las instalaciones son correctas
RUN pip freeze | grep pymongo
RUN pip freeze | grep motor

# Copiar el código fuente después de las dependencias
COPY . .

EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]