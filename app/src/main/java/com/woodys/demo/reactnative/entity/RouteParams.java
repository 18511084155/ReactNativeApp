package com.woodys.demo.reactnative.entity;

import java.io.Serializable;

/**
 * Created by woodys on 2018/2/8.
 */

public class RouteParams implements Serializable {
    public String status;
    public User user;
    public Params params;

    public static class User implements Serializable {
        public String Authorization;
        public String phoneNo;
        //token续期使用
        public String refreshToken;
        public String grantType;
        public String refreshKey;
    }

    public static class Params implements Serializable {
        public boolean isActive;
        public String repayStatus;
        public String path;
    }

}
