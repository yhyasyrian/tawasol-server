# tawasol-server

This is a simple project to handle node.js and mongoose-type databases

The project is simple API, you can test and learn how create API with node.js from this repository

## Route

You can test with postman after import file: `./Routes/tawasol.postman_collection.json` or continue with me

### api/users

<details>
 <summary><code>POST</code>   <code><b>/login</b></code></summary>

##### Body

> | name     | type     | data type | description |
> | -------- | -------- | --------- | ----------- |
> | email    | required | string    | N/A         |
> | password | required | string    | N/A         |

</details>
<details>
 <summary><code>POST</code>   <code><b>/register</b></code></summary>

##### Body

> | name     | type     | data type | description |
> | -------- | -------- | --------- | ----------- |
> | email    | required | string    | N/A         |
> | password | required | string    | N/A         |

</details>
<details>
 <summary><code>GET</code>   <code><b>/</b></code></summary>

##### Headers

> | name         | type     | data type | description               |
> | ------------ | -------- | --------- | ------------------------- |
> | x-auth-token | required | string    | Token account after login |

</details>

### api/profiles

<details>
 <summary><code>GET</code>   <code><b>/</b></code></summary>

##### Headers

> | name         | type     | data type | description               |
> | ------------ | -------- | --------- | ------------------------- |
> | x-auth-token | required | string    | Token account after login |

</details>
<details>
 <summary><code>GET</code>   <code><b>/me</b></code></summary>

##### Headers

> | name         | type     | data type | description               |
> | ------------ | -------- | --------- | ------------------------- |
> | x-auth-token | required | string    | Token account after login |

</details>
<details>
 <summary><code>POST</code>   <code><b>/</b></code></summary>

##### Headers

> | name         | type     | data type | description               |
> | ------------ | -------- | --------- | ------------------------- |
> | x-auth-token | required | string    | Token account after login |

##### Body

> | name       | type     | data type                                                          | description      |
> | ---------- | -------- | ------------------------------------------------------------------ | ---------------- |
> | status     | required | string                                                             | status user      |
> | company    | required | string                                                             | name company     |
> | website    | required | string                                                             | website          |
> | country    | required | string                                                             | name country     |
> | location   | required | string                                                             | location         |
> | bio        | required | string                                                             | bio              |
> | skills     | required | array[string]                                                      | skills           |
> | experience | required | array[{title,company,location,from:date,current:bool,description}] | experiences user |
> | education  | required | array[{school,degree,from:date,current:bool,description}]          | education user   |
> | github     | required | string                                                             | Social Media     |
> | youtube    | required | string                                                             | Social Media     |
> | facebook   | required | string                                                             | Social Media     |
> | instagram  | required | string                                                             | Social Media     |
> | linkedin   | required | string                                                             | Social Media     |

</details>
