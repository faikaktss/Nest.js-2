# NestJS Kullanıcı Yönetimi ve Kimlik Doğrulama API'si

Bu proje, NestJS, Prisma ORM ve JWT tabanlı kimlik doğrulama kullanarak oluşturulmuş temel bir kullanıcı yönetim ve kimlik doğrulama RESTful API'sidir. Kullanıcıların kaydolmasını, giriş yapmasını ve yetkilendirilmiş rotalara erişmesini sağlar.

## 🚀 Projenin Amacı ve Özellikleri

Bu API, modern bir web uygulamasının arka ucu için temel kullanıcı yönetimi ve güvenli kimlik doğrulama ihtiyaçlarını karşılamak üzere tasarlanmıştır. Temel özellikleri şunlardır:

* **Kullanıcı Kaydı (`/auth/register`):** Yeni kullanıcıların güvenli bir şekilde sisteme kaydolmasını sağlar. Şifreler `bcrypt` kütüphanesi kullanılarak hashlenir ve veritabanında güvenli bir şekilde saklanır.
* **Kullanıcı Girişi (`/auth/login`):** Kayıtlı kullanıcıların e-posta ve şifreleriyle sisteme giriş yapmasını sağlar. Başarılı girişin ardından, yetkilendirme için kullanılacak bir JSON Web Token (JWT) döndürülür.
* **JWT Tabanlı Kimlik Doğrulama:** Erişim jetonları (JWT) kullanılarak API rotalarına güvenli erişim sağlanır.
* **Yetkilendirme (Authorization):** Belirli API rotalarına yalnızca yetkili kullanıcıların veya belirli rollere sahip kullanıcıların (örneğin 'admin' rolü) erişimi kısıtlanır.
* **Kullanıcı Bilgilerine Erişim (`/users/profile`, `/users`):** Giriş yapmış kullanıcılar kendi profil bilgilerini görüntüleyebilirken, 'admin' rolüne sahip kullanıcılar sistemdeki tüm kullanıcıların listesini görüntüleyebilir.
* **Prisma ORM ile Veritabanı Etkileşimi:** Veritabanı işlemleri için modern ve tip güvenli bir ORM olan Prisma kullanılır.

## 🛠️ Teknolojiler

* **[NestJS](https://nestjs.com/):** Ölçeklenebilir, güvenilir ve yüksek performanslı sunucu tarafı uygulamaları oluşturmak için ilerici bir Node.js çerçevesi.
* **[Prisma](https://www.prisma.io/):** Veritabanı erişimi için yeni nesil bir ORM. Veritabanınızla etkileşim kurmayı kolaylaştıran tip güvenli bir API sağlar.
* **[bcrypt](https://www.npmjs.com/package/bcrypt):** Şifreleri güvenli bir şekilde hashlemek için kullanılan bir kütüphane.
* **[JSON Web Tokens (JWT)](https://jwt.io/):** API'ler için kompakt, URL güvenli bir şekilde kimlik doğrulama bilgilerini iletmek için kullanılan bir standart.
* **[@nestjs/passport](https://docs.nestjs.com/techniques/authentication):** NestJS uygulamalarında kimlik doğrulama stratejilerini entegre etmek için kullanılan bir modül.
* **[@nestjs/jwt](https://docs.nestjs.com/techniques/authentication#jwt-strategy):** NestJS uygulamalarında JWT kullanımı için entegrasyon.
* **[TypeScript](https://www.typescriptlang.org/):** Geliştirme sürecinde daha sağlam ve bakımı kolay kod yazmaya olanak tanıyan, JavaScript'in tip güvenli bir üst kümesi.

## 📦 Kurulum ve Çalıştırma

Bu projeyi yerel makinenizde kurmak ve çalıştırmak için aşağıdaki adımları izleyin:

### Önkoşullar

* Node.js (LTS sürümü önerilir)
* npm veya Yarn
* Bir veritabanı (Prisma'nın desteklediği herhangi biri, örneğin PostgreSQL, MySQL, SQLite)

### Adımlar

1.  **Projeyi Klonlayın:**
    ```bash
    git clone [https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git](https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git)
    cd REPO_ADINIZ
    ```
    (Yukarıdaki `KULLANICI_ADINIZ` ve `REPO_ADINIZ` kısımlarını kendi GitHub kullanıcı adınız ve repo adınızla değiştirin.)

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    # veya
    yarn install
    ```

3.  **Ortam Değişkenlerini Yapılandırın:**
    Projenin kök dizininde bir `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin. **`DATABASE_URL`'i kendi veritabanı bağlantı dizenizle ve `JWT_SECRET`'i güvenli, karmaşık bir sırla değiştirin.**

    ```dotenv
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
    JWT_SECRET="cok_gizli_ve_uzun_bir_anahtar_buraya_gelecek_lutfen_degistirin"
    PORT=3000 # İsteğe bağlı, varsayılan 3000
    ```
    * **`DATABASE_URL`**: Veritabanı bağlantı dizeniz. Örneğin:
        * PostgreSQL: `postgresql://user:password@localhost:5432/mydb?schema=public`
        * MySQL: `mysql://user:password@localhost:3306/mydb`
        * SQLite: `file:./dev.db` (Proje dizininde bir `dev.db` dosyası oluşturur)

4.  **Prisma Veritabanını Yapılandırın:**

    * **Veritabanı Şemasını Güncelleyin (Gerekirse):**
        Projenizdeki Prisma şeması (`prisma/schema.prisma` dosyası) veritabanı modelinizi tanımlar. Eğer bir değişiklik yaptıysanız veya yeni bir veritabanı kullanıyorsanız, Prisma şemasını veritabanınıza uygulamanız gerekir:
        ```bash
        npx prisma migrate dev --name init # 'init' yerine anlamlı bir isim verebilirsiniz
        ```
        Bu komut, veritabanınızı `schema.prisma` dosyanızla eşleşecek şekilde senkronize eder ve gerekirse bir migration dosyası oluşturur.

    * **Prisma Client'ı Oluşturun:**
        Prisma Client'ı oluşturmak, NestJS uygulamanızın veritabanınızla etkileşim kurabilmesi için gereklidir.
        ```bash
        npx prisma generate
        ```

5.  **Uygulamayı Başlatın:**

    * **Geliştirme Modu:**
        ```bash
        npm run start:dev
        # veya
        yarn start:dev
        ```
        Bu komut, uygulamanızı izleme modunda başlatır, yani kodunuzda yaptığınız her değişiklikte otomatik olarak yeniden derlenir ve yeniden başlatılır.

    * **Üretim Modu:**
        ```bash
        npm run build
        npm run start
        # veya
        yarn build
        yarn start
        ```
        Bu komutlar, uygulamayı üretim için derler ve ardından başlatır.

## 🚀 API Uç Noktaları (Endpoints)

Uygulama çalıştıktan sonra, API'ye aşağıdaki uç noktalar üzerinden erişebilirsiniz:

**Auth Modülü:**

* **`POST /auth/register`**
    * **Açıklama:** Yeni bir kullanıcı kaydeder.
    * **İstek Gövdesi (Body):**
        ```json
        {
            "email": "test@example.com",
            "password": "securepassword123",
            "role": "user" // veya "admin"
        }
        ```
    * **Başarılı Yanıt:**
        ```json
        {
            "id": 1,
            "email": "test@example.com",
            "role": "user"
        }
        ```

* **`POST /auth/login`**
    * **Açıklama:** Mevcut bir kullanıcının kimliğini doğrular ve bir JWT erişim jetonu döndürür.
    * **İstek Gövdesi (Body):**
        ```json
        {
            "email": "test@example.com",
            "password": "securepassword123"
        }
        ```
    * **Başarılı Yanıt:**
        ```json
        {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzgwMDc1MzAsImV4cCI6MTY3ODAwODczMH0.EXAMPLE_JWT_TOKEN"
        }
        ```
    * **Hata Yanıtı:**
        ```json
        {
            "statusCode": 403,
            "message": "Yanlış kullanıcı bilgileri",
            "error": "Forbidden"
        }
        ```

**Users Modülü (JWT Kimlik Doğrulaması Gerektirir):**

* **`GET /users`**
    * **Açıklama:** Sistemdeki tüm kullanıcıları listeler. **Sadece 'admin' rolüne sahip kullanıcılar erişebilir.**
    * **Başlıklar (Headers):** `Authorization: Bearer <JWT_TOKEN>`
    * **Başarılı Yanıt:**
        ```json
        [
            {
                "id": 1,
                "email": "admin@example.com",
                "role": "admin"
            },
            {
                "id": 2,
                "email": "user@example.com",
                "role": "user"
            }
        ]
        ```
    * **Hata Yanıtı (Yetkisiz Erişim):**
        ```json
        {
            "statusCode": 403,
            "message": "admin yetkin yok",
            "error": "Forbidden"
        }
        ```

* **`GET /users/profile`**
    * **Açıklama:** Giriş yapmış kullanıcının kendi profil bilgilerini döndürür.
    * **Başlıklar (Headers):** `Authorization: Bearer <JWT_TOKEN>`
    * **Başarılı Yanıt:**
        ```json
        {
            "id": 1,
            "email": "test@example.com",
            "role": "user"
        }
        ```
    * **Hata Yanıtı (Yetkisiz Erişim veya Mantık Hatası):**
        ```json
        {
            "statusCode": 403,
            "message": "Yanlis bilgi girdin",
            "error": "Forbidden"
        }
        ```
        *(**Not:** Bu endpoint'teki mevcut yetkilendirme kontrolünde bir mantık hatası bulunmaktadır. `if(user != 'Profile')` yerine `if(user.role !== 'user' && user.role !== 'admin')` veya benzeri bir kontrol gereklidir. Geliştirmeyi yaparken bu kısmı düzenlemeyi unutmayın.)*

* **`GET /users/check-header`**
    * **Açıklama:** JWT Guard'ın doğru çalışıp çalışmadığını test etmek için kullanılır. Geçerli bir JWT ile istek gönderildiğinde başarılı yanıt döner.
    * **Başlıklar (Headers):** `Authorization: Bearer <JWT_TOKEN>`
    * **Başarılı Yanıt:**
        ```json
        {
            "message": "Header doğru guard çalıştı"
        }
        ```

## 🧪 Testler

Proje, servisler ve kontrolörler için birim testleri içermektedir. Testleri çalıştırmak için:

```bash
npm run test
# veya
yarn test
