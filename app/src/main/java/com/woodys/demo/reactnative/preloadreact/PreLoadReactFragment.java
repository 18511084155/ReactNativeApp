package com.woodys.demo.reactnative.preloadreact;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.ViewGroup;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;

/**
 * Created by jingqiang on 2017/3/9.
 */

public abstract class PreLoadReactFragment extends Fragment {
    protected final BasePreLoadReactDelegate mDelegate;

    protected PreLoadReactFragment() {
        mDelegate = createReactActivityDelegate();
    }

    protected abstract String getMainComponentName();

    protected abstract Bundle getLaunchOptionsByBundle();

    protected BasePreLoadReactDelegate createReactActivityDelegate() {
        return new BasePreLoadReactDelegate(getMainComponentName()) {
            @javax.annotation.Nullable
            @Override
            protected Bundle getLaunchOptions() {
                return getLaunchOptionsByBundle();
            }

            @Override
            public Activity getPlainActivity() {
                return getActivity();
            }
        };
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        mDelegate.onCreate();
    }

    @Nullable
    @Override
    public ReactRootView onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        ReactRootView rootView = mDelegate.getReactRootView();
        return rootView;
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mDelegate.startReactApplication();
    }

    @Override
    public void onPause() {
        super.onPause();
        mDelegate.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
        mDelegate.onResume();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mDelegate.onDestroy();
    }

    public boolean onKeyUp(int keyCode, KeyEvent event) {
        return mDelegate.onKeyUp(keyCode, event);
    }

    public final ReactNativeHost getReactNativeHost() {
        return mDelegate.getReactNativeHost();
    }

    public final ReactInstanceManager getReactInstanceManager() {
        return mDelegate.getReactInstanceManager();
    }

}
