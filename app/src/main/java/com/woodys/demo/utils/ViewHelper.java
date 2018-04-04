package com.woodys.demo.utils;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ValueAnimator;
import android.app.Application;
import android.content.Context;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.DecelerateInterpolator;
import android.widget.ImageView;
import android.widget.TextView;

import com.woodys.demo.R;


/**
 * Created by cz on 9/8/16.
 */
public class ViewHelper {
    private static Context appContext;
    static {
        appContext = getContext();
    }

    public static Context getContext() {
        if (appContext == null) {
            try {
                Application application=(Application) Class.forName("android.app.ActivityThread").getMethod("currentApplication").invoke(null);
                appContext = application.getApplicationContext();
            } catch (final Exception e) {
                e.printStackTrace();
            }
        }
        return appContext;
    }


    /**
     * 控件抖动
     *
     * @param view
     */
    public static void startShake(View view) {
        Context context = getContext();
        Animation shake = android.view.animation.AnimationUtils.loadAnimation(context, R.anim.shake);//加载动画资源文件
        view.startAnimation(shake); //给组件播放动画效果
    }

    /**
     * view drawable shake
     * @param view
     */
    public static void viewDrawableShake(View view){
        final Drawable drawable = getViewDrawable(view);
        if (null != drawable) {
            int intrinsicWidth = drawable.getIntrinsicWidth();
            int intrinsicHeight = drawable.getIntrinsicHeight();
            if(-1==intrinsicWidth||-1==intrinsicHeight){
                Rect bounds = drawable.getBounds();
                intrinsicWidth=bounds.width();
                intrinsicHeight=bounds.height();
            }
            ValueAnimator squashAnimSize = android.animation.ValueAnimator.ofInt(5);
            squashAnimSize.setDuration(200);
            squashAnimSize.setRepeatCount(1);
            squashAnimSize.setRepeatMode(ValueAnimator.REVERSE);
            squashAnimSize.setInterpolator(new DecelerateInterpolator());
            final int finalIntrinsicWidth = intrinsicWidth;
            final int finalIntrinsicHeight = intrinsicHeight;
            squashAnimSize.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                @Override
                public void onAnimationUpdate(ValueAnimator animation) {
                    int size = Integer.valueOf(animation.getAnimatedValue().toString());
                    Rect rect = new Rect(size, size, finalIntrinsicWidth - size, finalIntrinsicWidth - size);
                    drawable.setBounds(rect);
                    drawable.invalidateSelf();
                }
            });
            squashAnimSize.addListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    Rect rect = new Rect(0, 0, finalIntrinsicWidth, finalIntrinsicHeight);
                    drawable.setBounds(rect);
                    drawable.invalidateSelf();
                }
            });
            squashAnimSize.start();
        }
    }


    private static Drawable getViewDrawable(View view) {
        Drawable drawable = null;
        if (view instanceof ViewGroup) {
            ViewGroup layout = (ViewGroup) view;
            for (int i = 0; i < layout.getChildCount(); ) {
                drawable = getChildViewDrawable(layout.getChildAt(i++));
                if (null != drawable) {
                    break;
                }
            }
        } else {
            drawable = getChildViewDrawable(view);
        }
        return drawable;
    }

    private static Drawable getChildViewDrawable(final View view) {
        Drawable drawable=null;
        if (view instanceof TextView) {
            Drawable[] drawables = ((TextView) view).getCompoundDrawables();
            for (int i = 0; i < drawables.length; i++) {
                if (null != drawables[i]) {
                    drawable=drawables[i];
                    break;
                }
            }
        } else if (view instanceof ImageView) {
            drawable=((ImageView) view).getDrawable();
        } else {
            drawable=view.getBackground();
		}
        return drawable;
    }
}
