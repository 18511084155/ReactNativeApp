package com.woodys.demo.reactnative.communication

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Created by woodys on 2017/12/24.
 */

class NavigationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "navigation"
    }

    /**
     * 关闭当前activity
     */
    @ReactMethod
    fun back() {
        if (currentActivity == null) return
        currentActivity!!.finish()
    }
}