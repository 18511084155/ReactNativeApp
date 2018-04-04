package com.woodys.demo

import android.Manifest
import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.graphics.drawable.Drawable
import android.graphics.drawable.StateListDrawable
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.SystemClock
import android.support.annotation.DrawableRes
import android.support.v4.app.Fragment
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatActivity
import android.widget.Toast
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.woodys.demo.callback.OnBackPressListener
import com.woodys.demo.fragments.Home1Fragment
import com.woodys.demo.fragments.Home6Fragment
import com.woodys.demo.fragments.WithdrawalsFragment
import com.woodys.demo.utils.Res
import com.woodys.demo.reactnative.constants.FileConstant
import com.woodys.demo.reactnative.hotupdate.HotUpdate
import com.woodys.fragments.HomeFragment
import kotlinx.android.synthetic.main.activity_main_new.*

/**
 * @author woodys
 * *
 * @update 2016/9/8
 */
class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    val HOME_TAB1 = "xyqb://loan"
    val HOME_TAB2 = "xyqb://blanknote"
    val HOME_TAB3 = "xyqb://credit"
    val HOME_TAB4 = "xyqb://my"

    override fun invokeDefaultOnBackPressed() {
        super.onBackPressed()
    }

    override fun onPause() {
        super.onPause()
        if (getReactInstanceManager() != null) {
            getReactInstanceManager().onHostPause(this)
        }
    }

    override fun onResume() {
        super.onResume()
        if (getReactInstanceManager() != null) {
            getReactInstanceManager().onHostResume(this, this)
        }
    }

    fun getReactNativeHost(): ReactNativeHost {
        return (application as ReactApplication).reactNativeHost
    }

    fun getReactInstanceManager(): ReactInstanceManager {
        return getReactNativeHost().reactInstanceManager
    }

    private var currentFragment: Fragment? = null

    //统计页面进入的时间
    private var timeItems = mutableMapOf<Int, Long>()

    //RN需要变量
    private var mDownLoadId: Long = 0
    private var localReceiver: MainActivity.CompleteReceiver? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main_new)
        initTagHostItems()
        //网络状态广播
        localReceiver = CompleteReceiver()
        registerReceiverItem(localReceiver, DownloadManager.ACTION_DOWNLOAD_COMPLETE)
    }

    private fun initTagHostItems() {
        val tabItems = mutableListOf<Pair<Fragment, Boolean>>()
        tabHost.addTextSpec(Res.getString(R.string.home_tab_borrow_text), HOME_TAB1, getTabItemDrawable(R.drawable.home_borrow, R.drawable.home_borrow_select))
        tabHost.addTextSpec(Res.getString(R.string.home_tab_mall_text), HOME_TAB2, getTabItemDrawable(R.drawable.home_credit, R.drawable.home_credit_select))
        tabHost.addTextSpec(Res.getString(R.string.home_tab_cash_text), HOME_TAB3, getTabItemDrawable(R.drawable.home_cash, R.drawable.home_cash_select))
        tabHost.addTextSpec(Res.getString(R.string.home_tab_mine_text), HOME_TAB4, getTabItemDrawable(R.drawable.home_user, R.drawable.home_user_select))
        //tabItems.add(HomeFragment().apply { arguments = Bundle().apply { putString("routeName", "HomePage")} }.to(false))
        tabItems.add(HomeFragment().to(false))
        tabItems.add(Home1Fragment().to(false))
        tabItems.add(WithdrawalsFragment().to(false))
        tabItems.add(Home6Fragment().to(false))
        tabHost.setOnTabSelectListener { _, position ->
            val (_, login) = tabItems[position]
            tabHost.setItemSelected(position, true)
            tabHost.setSelectPosition(position)
            login.not()
        }
        val fragmentItems = tabItems.map { it.first }
        supportFragmentManager.beginTransaction().add(R.id.fragmentContainer, fragmentItems[0]).commitAllowingStateLoss()
        tabHost.setOnTabItemClickListener { v, position, lastPosition ->

            //if(position==0) startActivity(Intent(this, ReactMainActivity::class.java))

            //if(position==2) startActivity(Intent(this, ReactMainActivity1::class.java))

            if (position != lastPosition) {
                currentFragment = fragmentItems[position]
                timeItems.put(position, SystemClock.uptimeMillis())
                currentFragment = fragmentItems[position]
                currentFragment?.let { showFragment(it, fragmentItems[lastPosition]) }
            }
        }
        val index = intent.getIntExtra("index", 0)
        tabHost.setItemSelected(index, true)
        tabHost.setSelectPosition(index)
    }


    private fun getTabItemDrawable(@DrawableRes res: Int, @DrawableRes selectRes: Int): Drawable {
        val stateListDrawable = StateListDrawable()
        stateListDrawable.addState(intArrayOf(android.R.attr.state_selected), ContextCompat.getDrawable(this, selectRes))
        stateListDrawable.addState(intArrayOf(), ContextCompat.getDrawable(this, res))
        return stateListDrawable
    }


    /**
     * 显示指定fragment,并隐藏其他fragment

     * @param showFragment
     * *
     * @param hideFragment
     */
    private fun showFragment(showFragment: Fragment, hideFragment: Fragment) {
        val fragmentManager = supportFragmentManager
        if (showFragment.isAdded) {
            fragmentManager.beginTransaction().show(showFragment).commitAllowingStateLoss()
        } else {
            fragmentManager.beginTransaction().add(R.id.fragmentContainer, showFragment).commitAllowingStateLoss()
        }
        fragmentManager.beginTransaction().hide(hideFragment).commitAllowingStateLoss()
    }


    override fun onBackPressed() {
        if (0 < supportFragmentManager.backStackEntryCount) {
            super.onBackPressed()
        } else {
            var goBack = false
            if (null != currentFragment && currentFragment is OnBackPressListener) {
                goBack = (currentFragment as OnBackPressListener).onBackPress()
            }
            if (!goBack) {
                finish()
            }
        }

    }


    /**
     * 注册广播接收者
     */
    private fun registerReceiverItem(m: BroadcastReceiver?, vararg actions: String) {
        // 网络广播接收者
        val mFilter = IntentFilter()
        for (action in actions) {
            mFilter.addAction(action)
        }
        registerReceiver(m, mFilter)
    }


    /**
     * 检查版本号
     */
    private fun checkVersion() {
        // 默认有最新版本
        Toast.makeText(this, "开始下载",Toast.LENGTH_SHORT).show()
        //第一步需要请求服务器，判断是否有新版本

        //有新版本进行后续流程
        downLoadBundle(null)
    }


    var downloadManagerClosure:Runnable?=null

    /**
     * 下载最新Bundle
     */
    private fun downLoadBundle(js_bundle_remote_url:String?) {
        downloadManagerClosure = Runnable {
            // 1.下载前检查SD卡是否存在更新包文件夹
            HotUpdate.checkPackage(applicationContext, FileConstant.LOCAL_FOLDER)
            // 2.下载
            val downloadManager = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
            val request = DownloadManager.Request(Uri.parse(js_bundle_remote_url))
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_HIDDEN)
            request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE or DownloadManager.Request.NETWORK_WIFI)
            request.setDestinationUri(Uri.parse("file://" + FileConstant.JS_PATCH_LOCAL_PATH))
            mDownLoadId = downloadManager.enqueue(request)
        }

        if (!hasPermission(this@MainActivity, Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                requestPermissions(arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE), 300)
            }else{
                //请打开存储读写权限，确保APP正常运行!
            }
        }else{
            downloadManagerClosure?.run()
        }
    }

    /**
     * 判断某个权限是否授权
     * @param permissionName 权限名称，比如：android.permission.READ_PHONE_STATE
     * *
     * @return
     */
    fun hasPermission(context: Context, permissionName: String): Boolean {
        var result = false
        try {
            val pm = context.packageManager
            result = PackageManager.PERMISSION_GRANTED == pm.checkPermission(permissionName, context.packageName)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return result
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 300) {
            downloadManagerClosure?.run()
        } else {
            //请打开存储读写权限，确保APP正常运行!
        }
    }

    inner class CompleteReceiver : BroadcastReceiver() {

        override fun onReceive(context: Context, intent: Intent) {
            val completeId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)
            if (completeId == mDownLoadId) {
                HotUpdate.handleZIP(applicationContext)
            }
        }
    }

    override fun onDestroy() {
        unregisterReceiver(localReceiver)
        super.onDestroy()
    }

}
