package com.woodys.demo.reactnative.hotupdate;

import java.io.File;
import java.util.Comparator;

/**
 * Created by woodys on 2018/3/23.
 * 按 文件修改时间排序（从新到旧）
 *
 */
public class CompratorByFileTime implements Comparator<File> {
    @Override
    public int compare(File file1, File file2) {
        int diff = 0;
        try {
            diff = file1.getName().compareTo(file2.getName());
        } catch (NullPointerException e) {
            diff = -1;
        }
        if (diff > 0) {
            return -1;
        } else if (diff == 0) {
            return 0;
        } else {
            return 1;
        }
    }

    @Override
    public boolean equals(Object o) {
        return true;
    }

}