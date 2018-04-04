package com.woodys.demo

import android.content.Context
import android.support.multidex.MultiDex
import android.support.multidex.MultiDexApplication
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.woodys.demo.reactnative.communication.OtherReactPackage
import com.woodys.demo.reactnative.constants.FileConstant
import com.woodys.demo.reactnative.splashscreen.RCTSplashScreenPackage
import com.woodys.demo.BuildConfig
import java.io.File
import java.util.*

class App : MultiDexApplication(), ReactApplication {
    private val mReactNativeHost = object : ReactNativeHost(this) {
        override fun getJSBundleFile(): String? {
            val file = File(FileConstant.JS_BUNDLE_LOCAL_PATH)
            if (file.exists()) {
                return file.absolutePath
            }else {
                return super.getJSBundleFile()
            }
        }

        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getPackages(): List<ReactPackage> {
            return Arrays.asList<ReactPackage>(
                    MainReactPackage(),
                    RCTSplashScreenPackage(),
                    OtherReactPackage()//<-- 添加这一行，类名替换成你的Package类的名字.
            )
        }

        override fun getJSMainModuleName(): String {
            return "index.android"
        }
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return mReactNativeHost
    }

    override fun attachBaseContext(base: Context) {
        super.attachBaseContext(base)
        MultiDex.install(base)
    }
}
