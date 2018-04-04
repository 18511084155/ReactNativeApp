package com.woodys.demo.reactnative.hotupdate;

import android.content.Context;
import android.text.TextUtils;


import com.woodys.demo.reactnative.constants.AppConstant;
import com.woodys.demo.reactnative.constants.FileConstant;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.LinkedList;

/**
 * 热修复
 * Created by woodys on 2017/5/12.
 */
public class HotUpdate {

    public static void checkVersion() {
        // 检查版本是否需要更新
    }

    public static void checkPackage(Context context, String filePath) {
        // 1.下载前检查SD卡是否存在更新包文件夹,FIRST_UPDATE来标识是否为第一次下发更新包
        File bundleFile = new File(filePath);
        if(bundleFile != null && bundleFile.exists()) {
            ACache.get(context).put(AppConstant.FIRST_UPDATE,false);
        } else {
            ACache.get(context).put(AppConstant.FIRST_UPDATE,true);
        }
    }

    public static void handleZIP(final Context context) {
        // 开启单独线程，解压，合并。
        new Thread(new Runnable() {
            @Override
            public void run() {
                boolean result = (Boolean) ACache.get(context).getAsObject(AppConstant.FIRST_UPDATE);
                String filePath = null;
                String oldFilePath = FileConstant.LOCAL_FOLDER + File.separator+ FileZipUtils.getLastTimeFile(FileConstant.LOCAL_FOLDER) + File.separator + FileConstant.JS_BUNDLE_LOCAL_FILE;

                if (result) {
                    filePath = FileConstant.LOCAL_FOLDER + File.separator + TimeString.getTimeString();
                    // 解压到根目录
                    FileZipUtils.decompression(filePath);
                    // 合并
                    mergePatAndAsset(context,filePath,oldFilePath);
                } else {
                    filePath = FileConstant.LOCAL_FOLDER + File.separator + TimeString.getTimeString();
                    // 解压到future目录
                    FileZipUtils.decompression(filePath);
                    // 合并
                    mergePatAndBundle(filePath,oldFilePath);
                }
            }
        }).start();
    }

    /**
     * 与Asset资源目录下的bundle进行合并
     */
    private static void mergePatAndAsset(Context context, String filePath, String oldFilePath) {

        // 1.解析Asset目录下的bundle文件
        String assetsBundle = FileZipUtils.getJsBundleFromAssets(context,FileConstant.JS_BUNDLE_LOCAL_FILE);
        // 2.解析bundle当前目录下.pat文件字符串
        String patchLocalFile = filePath + File.separator + FileConstant.BUNDLE_PAT_FILE;
        String patcheStr = FileZipUtils.getStringFromPat(patchLocalFile);
        // 3.合并
        merge(patcheStr,assetsBundle,oldFilePath);
        // 4.删除pat
        FileZipUtils.deleteFile(patchLocalFile);
    }

    /**
     * 与SD卡下的bundle进行合并
     */
    private static void mergePatAndBundle(String filePath, String oldFilePath) {

        // 1.解析sd卡目录下的bunlde
        String assetsBundle = FileZipUtils.getJsBundleFromSDCard(oldFilePath);
        // 2.解析最新下发的.pat文件字符串
        String patchLocalFile = filePath + File.separator + FileConstant.BUNDLE_PAT_FILE;
        String patcheStr = FileZipUtils.getStringFromPat(patchLocalFile);
        // 3.合并
        merge(patcheStr,assetsBundle,oldFilePath);
        // 4.删除pat
        FileZipUtils.deleteFile(patchLocalFile);
        // 5.删除本次下发的更新文件
        FileZipUtils.deleteFiles(filePath);
    }

    /**
     * 合并,生成新的bundle文件
     */
    private static void merge(String patcheStr, String bundle, String oldFilePath) {
        if(TextUtils.isEmpty(patcheStr)) return;
        // 3.初始化 dmp
        diff_match_patch dmp = new diff_match_patch();
        // 4.转换pat
        LinkedList<diff_match_patch.Patch> pathes = (LinkedList<diff_match_patch.Patch>) dmp.patch_fromText(patcheStr);
        // 5.pat与bundle合并，生成新的bundle
        Object[] bundleArray = dmp.patch_apply(pathes,bundle);
        // 6.保存新的bundle文件
        try {
            Writer writer = new FileWriter(oldFilePath);
            String newBundle = (String) bundleArray[0];
            writer.write(newBundle);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
