# Password Generator API Documentation

## Overview

This API is designed for generating random passwords based on specified parameters. All operations are performed on the client side, without the need for a server-side component. The API supports multiple output formats: `plain`, `json`, `csv`, and `yaml`.

## API Endpoint

### URL

```/api```

### Query Parameters

| Parameter      | Type    | Description                                                      | Default Value |
|----------------|---------|------------------------------------------------------------------|---------------|
| `lowercase`    | boolean | Include lowercase letters in the passwords.                      | `true`        |
| `uppercase`    | boolean | Include uppercase letters in the passwords.                      | `true`        |
| `numbers`      | boolean | Include digits in the passwords.                                 | `true`        |
| `symbols`      | boolean | Include special characters in the passwords.                     | `false`       |
| `unicode`      | boolean | Include umlauts and characters from other languages.             | `false`       |
| `length`       | integer | Length of the password (minimum 1).                              | `12`          |
| `count`        | integer | Number of passwords to generate (minimum 1).                     | `1`           |
| `format`       | string  | Output format: `plain`, `json`, `csv`, `yaml`.                  | `plain`       |

### Example Request

```http
GET /api?lowercase=true&uppercase=true&numbers=false&symbols=false&unicode=false&length=16&count=4&format=json
OR
GET https://tsprnay.github.io/PasswordGenerator/api?lowercase=true&uppercase=true&numbers=false&symbols=false&unicode=false&length=16&count=4&format=json
```

### Example Response

- #### JSON:
```json
{"auOOyTDYoHrbJhBN", "ZgLGkyweXfNiLGef", "TeAtHodCdkYCZdJR", "FQGappcoqrRyllOg"}
```

- #### Plain Text:
```text
oTdOOvWvujcGpjxS
SLvUTVDkBotHIIkx
QWrcwWpeqXlTtscm
YeyJaqSKoJQPfOGe
```

- #### CSV:
```csv
AanWwtTHtlLtMoit,
kaKggwSgirPuPKhm,
QDrNQsXNnmrGKZgL,
eFPWTmTApVzLSmwk
```

- #### YAML:
```yaml
- mxdzPTXHiftwXrSH
- cvWxaGsgaoRpJbmg
- MrTHYxnjGkGmeVIZ
- MUhxWstDPRPqFbti
```
