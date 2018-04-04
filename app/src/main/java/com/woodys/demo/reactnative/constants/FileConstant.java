package com.woodys.demo.reactnative.constants;

import android.os.Environment;

import com.woodys.demo.utils.PackageUtils;
import com.woodys.demo.reactnative.hotupdate.FileZipUtils;

import java.io.File;

/**
 * Created by woodys on 2018/01/01.
 */
public class FileConstant {

    //SD卡存储目录名称
    public static final String APP_STORAGE_DIRECTORY = "btlk_dir";

    /**
     * zip的文件名
     */
    public static final String ZIP_NAME = "BTLK";

    /**
     * bundle文件名
     */
    public static final String JS_BUNDLE_LOCAL_FILE = "index.android.jsbundle";

    public static final String PATCH_IMG_FILE = "patch_imgs.txt";

    public static final String BUNDLE_PAT_FILE = "bundle.pat";


    /**
     * 第一次解压zip后的文件目录
     */
    public static final String JS_PATCH_LOCAL_FOLDER = Environment.getExternalStorageDirectory().toString()
            + File.separator + PackageUtils.getPackageName();

    //public static final String JS_PATCH_LOCAL_FOLDER = Res.getContext().getFilesDir().getAbsolutePath();


    public static final String LOCAL_FOLDER = JS_PATCH_LOCAL_FOLDER + File.separator + APP_STORAGE_DIRECTORY;

    /**
     * zip文件
     */
    public static final String JS_PATCH_LOCAL_PATH = LOCAL_FOLDER + File.separator + ZIP_NAME+ ".zip";

    /**
     * 合并后的bundle文件保存路径
     */
    public static final String JS_BUNDLE_LOCAL_PATH = LOCAL_FOLDER + File.separator+ FileZipUtils.getLastTimeFile(FileConstant.LOCAL_FOLDER) + File.separator + JS_BUNDLE_LOCAL_FILE;

}
