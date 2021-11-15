# All routes Explained

## GET: ```/general/html```

It returns html table
___
## POST: `/general/import`

Expects Date in JSON object
|Expected | Description
|--------|-----------|
|date    | Should give value like '2021-5-3'
___
## GET: `/general/compare-percent`


---
## GET: `/companies/list`

Returns all list of companies in array with sector , name , website and instruments

---
POST: `/company/post`
<u>Expected data in req.body</u>
|EXPECTED   |Description|
|-----------|-----------|
|symbol     | should be given like 'abc'|
|status     | must be one of "active" or "suspended" or delisted"
|sector     | must be one of 13 categories mentioned in "company.js"|
|instrument | must be one of instrument defined in "company.js" |
|website    | String

`failed`:
If any of the data is not given it return status 422 and error 
`success`:
Returns status 200 along with result which is sent object

---

## PUT: `/company/:name` 


`:name` must be string original symbol to be updated if not it will return error  
<u>Expected data in req.body</u>
|EXPECTED   |Description|
|-----------|-----------|
|symbol     | should be given like 'abc'|
|status     | must be one of "active" or "suspended" or delisted"
|sector     | must be one of 13 categories mentioned in "company.js"|
|instrument | must be one of instrument defined in "company.js" |
|website    | String

`failed`:
If any of the data is not given it return status 422 and error 

`success`:
Returns status 200 along with result which is sent object

---