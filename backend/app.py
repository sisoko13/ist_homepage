# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pymysql
from werkzeug.utils import secure_filename
from datetime import date
from db import get_connection
from flask import send_from_directory


app = Flask(__name__)
CORS(app)





UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/debug/db', methods=['GET'])
def debug_db_connection():
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT NOW() AS current_time")
            result = cursor.fetchone()
        conn.close()
        return jsonify({
            "status": "success",
            "message": "DB 연동 성공",
            "current_time": result['current_time']
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"DB 연결 실패: {str(e)}"
        }), 500


@app.route('/api/news', methods=['POST'])
def create_news():
    title = request.form['title']
    summary = request.form['summary']
    author = request.form['author']
    category = request.form['category']
    content = request.form['content']
    featured = request.form.get('featured', 'false') == 'true'
    file = request.files.get('image')

    image_path = ''
    if file:
        filename = secure_filename(file.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(image_path)

    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO news (title, summary, author, category, content, featured, image_path)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
            cursor.execute(sql, (title, summary, author, category, content, featured, image_path))
        conn.commit()
        return jsonify({'message': 'News created'}), 201
    finally:
        conn.close()

@app.route('/api/news', methods=['GET'])
def get_news():
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM news ORDER BY id DESC")
            news = cursor.fetchall()
            for n in news:
                n['featured'] = bool(n['featured'])
                if n['image_path']:
                    filename = os.path.basename(n['image_path'])
                    n['image'] = f"http://localhost:5000/static/uploads/{filename}"  # ✅ 수정된 부분
            return jsonify(news)
    finally:
        conn.close()
@app.route('/api/news/<int:news_id>', methods=['DELETE'])
def delete_news(news_id):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            sql = "DELETE FROM news WHERE id = %s"
            cursor.execute(sql, (news_id,))
        conn.commit()
        return jsonify({'message': 'Deleted'}), 200
    finally:
        conn.close()

UPLOAD_FOLDER = 'static/publication_images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/api/publications", methods=["POST"])
def create_publication():
    type_ = request.form.get("type")
    title = request.form.get("title")
    authors = request.form.get("authors")
    venue = request.form.get("venue")
    year = request.form.get("year")
    badge = request.form.get("badge")
    link = request.form.get("link")
    file = request.files.get("image")

    image_path = ''
    if file:
        filename = secure_filename(file.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(image_path)

    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO publications (type, title, authors, venue, year, badge, image_path, link)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (
                type_, title, authors, venue, year, badge,
                image_path if image_path else None,
                link
            ))
        conn.commit()
        return jsonify({'message': 'Publication created'}), 201
    finally:
        conn.close()

@app.route("/api/publications", methods=["GET"])
def get_publications():
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM publications ORDER BY id DESC")
            rows = cursor.fetchall()
        return jsonify(rows)
    except Exception as e:
        print("Error fetching publications:", e)
        return jsonify({"message": "서버 오류", "error": str(e)}), 500
    finally:
        conn.close()



if __name__ == "__main__":
    app.run(debug=True)
