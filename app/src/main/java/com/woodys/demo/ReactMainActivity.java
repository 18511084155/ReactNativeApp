package com.woodys.demo;


import android.os.Bundle;


import com.woodys.demo.reactnative.preloadreact.PreLoadReactActivity;

import javax.annotation.Nullable;

/**
 * Created by woodys on 2017/2/13.
 */
public class ReactMainActivity extends PreLoadReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //open splashscreen
        //RCTSplashScreen.openSplashScreen(this);
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    protected String getMainComponentName() {
        return "btlkHomePage";
    }

    @Override
    protected Bundle getLaunchOptionsByBundle() {
        return new Bundle();
    }

}
