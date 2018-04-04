package com.woodys.fragments

import android.os.Bundle
import com.woodys.demo.reactnative.preloadreact.PreLoadReactFragment

/**
 * Created by woodys on 2017/10/9.
 */

class HomeFragment : PreLoadReactFragment() {
    override fun getLaunchOptionsByBundle(): Bundle {
        return Bundle()
    }

    override fun getMainComponentName(): String {
        return "btlkMainDrawCash"
    }
}
