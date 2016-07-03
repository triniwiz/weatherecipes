@JavaProxy("co.fitcom.SplashScreen")
export class SplashScreen extends com.viksaa.sssplash.lib.activity.AwesomeSplash {
    protected onCreate(bundle) {
        super.onCreate(bundle);
    }

    initSplash(configSplash) {

        //Customize Circular Reveal
        configSplash.setBackgroundColor(co.fitcom.WeatheRecipes.R.color.md_blue_grey_500); //any color you want form colors.xml
        configSplash.setAnimCircularRevealDuration(2000); //int ms
        configSplash.setRevealFlagX(com.viksaa.sssplash.lib.cnst.Flags.REVEAL_LEFT);  //or Flags.REVEAL_LEFT
        configSplash.setRevealFlagY(com.viksaa.sssplash.lib.cnst.Flags.REVEAL_TOP); //or Flags.REVEAL_TOP


        //Choose LOGO OR PATH; if you don't provide String value for path it's logo by default

        //Customize Logo
        configSplash.setLogoSplash(co.fitcom.WeatheRecipes.R.drawable.splash_logo); //or any other drawable
        configSplash.setAnimLogoSplashDuration(2000); //int ms
        configSplash.setAnimLogoSplashTechnique(com.daimajia.androidanimations.library.Techniques.Landing); //choose one form Techniques (ref: https://github.com/daimajia/AndroidViewAnimations)



        const title = com.tns.NativeScriptApplication.getInstance().getString(co.fitcom.WeatheRecipes.R.string.splash_title)
        //Customize Title
        configSplash.setTitleSplash(title);
        configSplash.setTitleTextColor(co.fitcom.WeatheRecipes.R.color.md_white);
        configSplash.setTitleTextSize(30);
        configSplash.setAnimTitleDuration(3000); //int ms
        configSplash.setAnimTitleTechnique(com.daimajia.androidanimations.library.Techniques.FadeIn);
        configSplash.setTitleFont("app/fonts/RobotoRegular.ttf"); //provide string to your font located in app/fonts/

    }
    animationsFinished() {
        const intent = new android.content.Intent(com.tns.NativeScriptApplication.getInstance().getApplicationContext(), com.tns.NativeScriptActivity.class)
        intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
        com.tns.NativeScriptApplication.getInstance().startActivity(intent);
    }
};