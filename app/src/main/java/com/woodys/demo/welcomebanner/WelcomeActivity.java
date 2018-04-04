package com.woodys.demo.welcomebanner;

import android.animation.Animator;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;

import com.woodys.demo.R;
import com.woodys.demo.MainActivity;

import butterknife.Bind;
import butterknife.ButterKnife;

/**
 * @author jingqiang
 * @desc TODO
 */
public class WelcomeActivity extends Activity{

    @Bind(R.id.welcome_img)
    ImageView mImg;
    //这里可以是图片集
    private int[] imgs = {R.mipmap.welcome_img};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.welcome_layout);
        ButterKnife.bind(this);
        mImg.setImageResource(imgs[0]);
        //timer操作符延迟1秒后执行动画。
        mImg.postDelayed(new Runnable() {
            @Override
            public void run() {startAnimation();}
        },1000);
    }

    private void startAnimation() {
        //ofFloat(T target, Property<T, Float> property, float... values)
        ObjectAnimator animatorX = ObjectAnimator.ofFloat(mImg,"scaleX",1f, 1.25f);
        ObjectAnimator animatorY = ObjectAnimator.ofFloat(mImg,"scaleY",1f, 1.25f);
        AnimatorSet animatorSet = new AnimatorSet();
        animatorSet.setDuration(1500)
                    .play(animatorX)
                    .with(animatorY);
        animatorSet.start();
        animatorSet.addListener(new Animator.AnimatorListener() {
            @Override
            public void onAnimationStart(Animator animation) {}

            @Override
            public void onAnimationEnd(Animator animation) {
                jumpMainActivity();
            }

            @Override
            public void onAnimationCancel(Animator animation) {}

            @Override
            public void onAnimationRepeat(Animator animation) {}
        });
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            //ReactNativePreLoader.preLoad(this, "onefragment");
            //ReactNativePreLoader.preLoad(this, "thirdfragment");
            //ReactNativePreLoader.preLoad(this, "reactactivity");
        }
    }

    public void jumpMainActivity() {
        Intent intent = new Intent(WelcomeActivity.this, MainActivity.class);
        startActivity(intent);
        finish();
    }


}
