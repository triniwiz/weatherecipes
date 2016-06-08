# Installation


##Api Setup

```
git clone https://github.com/triniwiz/weatherecipes-api
cd weatherecipes-api
npm run setup
npm run start
```

###Api Url

Production Mode

Update `SERVER_API` in `app/config.ts` to location of the server hosting api e.g `http://yourserver.net`

####Android Support

For connection with server on local machine use: adb reverse tcp:3000 tcp:3000
```
git clone https://github.com/triniwiz/weatherecipes
cd weatherecipes
npm install
tns run android
```

####IOS Support

```
git clone https://github.com/triniwiz/weatherecipes
cd weatherecipes
npm install
tns run ios
```


#Screenshots
![screenshots](/screenshots/Screenshot_2016-06-08-01-09-48.png)
