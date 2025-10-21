# JJ AppLink Express Hello

Plain Express app to respond to simple POST from AppLink<br/>
<br/>

Assumes you have a throw-away Salesforce org that is enabled for Heroku Applink.<br/>
<br/>

The only changes to make this work with [AppLink Service Mesh](https://github.com/heroku/heroku-buildpack-heroku-applink-service-mesh) are:
* add the service mesh buildpack
* add Heroku config var APP_PORT
* adjust the Procfile to launch service mesh
* in code, bind Express to $APP_PORT
<br/>

## Read First

*DISCLAIMER* -- This is a demo, not production code. Feel free to consult the code and use it to fuel your own ideas, but please do not assume it's ready to plug into a production environment as-is.<BR>
<br/>

---

## Setup

```
heroku create jj-applink-express-hello
```

```
heroku buildpacks:add heroku/heroku-applink-service-mesh
```

```
heroku buildpacks:add heroku/nodejs
```

```
heroku addons:create heroku-applink
```

```
heroku config:set APP_PORT=3000
```

```
git push heroku main
```

(Set permset for Manage Applink)

```
heroku salesforce:connect MyOrg
```

```
heroku salesforce:publish api-spec.yaml --client-name=HelloAPI --connection-name=MyOrg
```

(Set HelloAPI permset)<br/>
<br/>

## Testing

Run this anonymous Apex:
```
herokuapplink.HelloAPI api = new herokuapplink.HelloAPI();
herokuapplink.HelloAPI_hellorequestbody aBody = new herokuapplink.HelloAPI_hellorequestbody();
herokuapplink.HelloAPI.postHello_Request postRequest = new herokuapplink.HelloAPI.postHello_Request();
herokuapplink.HelloAPI.postHello_Response postResponse;
herokuapplink.HelloAPI_hellosuccessresponse successResp;

aBody.name = 'Salesforce';
postRequest.body = aBody;
postResponse = api.postHello(postRequest);
successResp = postResponse.Code200;
System.debug('greeting: ' + successResp.greeting);
```
<br/>

## Cleanup

Delete the Heroku app in the web dashboard or use this command:

```
heroku destroy
```