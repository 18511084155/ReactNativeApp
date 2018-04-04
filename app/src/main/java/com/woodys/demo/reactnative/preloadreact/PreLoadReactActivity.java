package com.woodys.demo.reactnative.preloadreact;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;

import javax.annotation.Nullable;

/**
 * 预加载Activity基类
 * Created by woodys on 2017/5/10.
 */

/**
 * Base Activity for React Native applications.
 */
public abstract class PreLoadReactActivity extends Activity
        implements DefaultHardwareBackBtnHandler, PermissionAwareActivity {

    protected final BasePreLoadReactDelegate mDelegate;

    protected PreLoadReactActivity() {
        mDelegate = createReactActivityDelegate();
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     * e.g. "MoviesApp"
     */
    protected abstract String getMainComponentName();

    protected abstract Bundle getLaunchOptionsByBundle();

    /**
     * Called at construction time, override if you have a custom delegate implementation.
     */
    protected BasePreLoadReactDelegate createReactActivityDelegate() {
        return new BasePreLoadReactDelegate(getMainComponentName()) {
            @Nullable
            @Override
            protected Bundle getLaunchOptions() {
                return getLaunchOptionsByBundle();
            }

            @Override
            public Activity getPlainActivity() {
                return PreLoadReactActivity.this;
            }
        };
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mDelegate.onCreate();
        ReactRootView reactRootView = mDelegate.getReactRootView();
        if(null != reactRootView){
            setContentView(reactRootView);
            mDelegate.startReactApplication();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        mDelegate.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mDelegate.onResume();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mDelegate.onDestroy();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        mDelegate.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        return mDelegate.onKeyUp(keyCode, event) || super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
        if(!mDelegate.onBackPressed()) {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    public void onNewIntent(Intent intent) {
        mDelegate.onNewIntent(intent);
        super.onNewIntent(intent);
    }

    @Override
    public void requestPermissions(
            String[] permissions,
            int requestCode,
            PermissionListener listener) {
        mDelegate.requestPermissions(permissions, requestCode, listener);
    }

    @Override
    public void onRequestPermissionsResult(
            int requestCode,
            String[] permissions,
            int[] grantResults) {
        mDelegate.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    protected final ReactNativeHost getReactNativeHost() {
        return mDelegate.getReactNativeHost();
    }

    protected final ReactInstanceManager getReactInstanceManager() {
        return mDelegate.getReactInstanceManager();
    }
}

