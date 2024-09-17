# KOMIK

## Create Komik

### POST /komiks

### body

```json
    {
        "title": "string 100",
        "author": "string 100",
        "description": "string"
    }
```

### Response success

```json
{
    "statusCode": 200,
    "message" : "create comic success",
    "data":[
        {
            "title": "string 100",
            "author": "string 100",
            "description": "string",
            "createdAt": "DateTime",
            "updatedAt" : "DateTime"
        }
    ]
}
```
