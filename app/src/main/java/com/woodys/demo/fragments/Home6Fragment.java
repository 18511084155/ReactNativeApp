package com.woodys.demo.fragments;


import android.os.Bundle;

import com.woodys.demo.reactnative.preloadreact.PreLoadReactFragment;

public class Home6Fragment extends PreLoadReactFragment {
    @Override
    public String getMainComponentName() {
        return "btlkHomePage";
    }

    @Override
    protected Bundle getLaunchOptionsByBundle() {
        return new Bundle();
    }

}
