# プロジェクトのセットアップ

## 前提条件
このプロジェクトを開始する前に、以下のソフトウェアがインストールされている必要があります：

- **MongoDB**
- **Node.js** と **npm**
- **Python**

## セットアップ手順

### フロントエンドのセットアップ
1. ターミナルでプロジェクトのフロントエンドディレクトリに移動します。
    ```sh
    cd frontend
    ```

2. `yarn install`コマンドを実行して依存関係をインストールします。
    ```sh
    yarn install
    ```

### バックエンドのセットアップ
1. ターミナルでプロジェクトのバックエンドディレクトリに移動します。
    ```sh
    cd backend
    ```

2. 仮想環境を作成します。
    ```sh
    python3 -m venv venv
    ```

3. 仮想環境を有効化します。
    - **macOS/Linux**:
        ```sh
        source venv/bin/activate
        ```
    - **Windows**:
        ```sh
        venv\Scripts\activate
        ```

4. `requirements.txt`から依存関係をインストールします。
    ```sh
    pip install -r requirements.txt
    ```

### サービスの開始
1. ターミナルでMongoDBを開始します。
    ```sh
    sudo systemctl start mongod
    ```

2. フロントエンド開発サーバーを起動します。
    ```sh
    cd frontend
    yarn dev
    ```

3. バックエンド開発サーバーを起動します。
    ```sh
    cd backend
    uvicorn app.main:app --reload
    ```

## アクセス
- フロントエンドは [http://localhost:5173](http://localhost:5173) で利用可能です。
- バックエンドは [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) で利用可能です。
- データベースは [mongodb://localhost:27017](mongodb://localhost:27017) で利用可能です。


