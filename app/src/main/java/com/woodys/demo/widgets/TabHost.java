package com.woodys.demo.widgets;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.support.annotation.DrawableRes;
import android.support.v4.content.ContextCompat;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.cz.library.widget.BadgerHelper;
import com.cz.library.widget.BadgerTextView;
import com.cz.library.widget.CenterTextView;
import com.cz.library.widget.DivideLinearLayout;
import com.woodys.demo.R;
import com.woodys.demo.callback.ViewClickShakeListener;


/**
 * Created by momo on 2015/3/8.
 */
public class TabHost extends DivideLinearLayout  {
    private int color;//默认颜色
    private int selectColor;//选中颜色
    private int padding;//spec对象内边距
    private int textSize;//标签文字大小
    private int lastPosition;//上一次点中位置
    private boolean[] showIndicates;
    private OnTabItemClickListener listener;
    private OnTabSelectListener onTabSelectListener;

    public TabHost(Context context) {
        this(context, null);
    }

    public TabHost(Context context, AttributeSet attrs) {
        super(context, attrs);
        setOrientation(LinearLayout.HORIZONTAL);
        TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.TabHost);
        setColor(a.getColor(R.styleable.TabHost_th_color, Color.WHITE));
        setSelectColor(a.getColor(R.styleable.TabHost_th_selectColor, Color.BLUE));
        setSpecPadding((int) a.getDimension(R.styleable.TabHost_th_specPadding, applyDimension(TypedValue.COMPLEX_UNIT_DIP, 8)));
        setTextSize(a.getDimensionPixelSize(R.styleable.TabHost_th_textSize,applyDimension(TypedValue.COMPLEX_UNIT_SP,12)));
        a.recycle();
    }

    public int applyDimension(int unit,float value) {
        return (int) TypedValue.applyDimension(unit, value, getResources().getDisplayMetrics());
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        int childCount = getChildCount();
        for (int i = 0; i < childCount; i++) {
            setOnSpecClickListener(getChildAt(i));
        }
    }

    /**
     * 设置文字选中颜色
     *
     * @param color
     */
    public void setColor(int color) {
        this.color = color;
        notifyDataChange();
    }

    /**
     * 设置选中颜色
     *
     * @param selectColor
     */
    public void setSelectColor(int selectColor) {
        this.selectColor = selectColor;
        notifyDataChange();
    }

    /**
     * 设置spec条目内边距
     *
     * @param padding 内边距
     */
    public void setSpecPadding(int padding) {
        this.padding = padding;
        notifyDataChange();
    }

    /**
     * 设置文字大小
     *
     * @param textSize
     */
    public void setTextSize(int textSize) {
        this.textSize = textSize;
        notifyDataChange();
    }

    /**
     * 刷新spec数据样式
     */
    private void notifyDataChange() {
        int childCount = getChildCount();
        for (int i = 0; i < childCount; i++) {
            View childView = getChildAt(i);
            if (childView instanceof TextView) {
                TextView textSpec = ((TextView) childView);
                //重置text Spec的颜色取值
                textSpec.setTextColor(i == lastPosition ? selectColor : color);
                textSpec.setTextSize(TypedValue.COMPLEX_UNIT_PX,textSize);
            } else if (childView instanceof ImageView) {
                //重置image Spec的内边距值
                childView.setPadding(padding, padding, padding, padding);
            }
        }
    }

    /**
     * 添加文字与图片spec
     *
     * @param text          提示文字
     * @param tag
     * @param drawable 图片
     */
    public TextView addTextSpec(String text, String tag, Drawable drawable) {
        Context context = getContext();
        BadgerTextView tabSpec = new BadgerTextView(context);
        tabSpec.setDrawableMode(CenterTextView.DRAWABLE_TOP);
        tabSpec.setTag(tag);
        tabSpec.setSizeMode(CenterTextView.TOP);//drawable top
        tabSpec.setCompoundDrawablePadding(applyDimension(TypedValue.COMPLEX_UNIT_DIP, 4));
        tabSpec.setCompoundDrawablesWithIntrinsicBounds(null, drawable, null, null);
        tabSpec.setDrawableWidth(applyDimension(TypedValue.COMPLEX_UNIT_DIP, 24));
        tabSpec.setDrawableHeight(applyDimension(TypedValue.COMPLEX_UNIT_DIP, 24));
        tabSpec.setTextSize(TypedValue.COMPLEX_UNIT_PX,textSize);
        boolean isSelect = 0 == getChildCount();
        tabSpec.setTextColor(isSelect ? selectColor : color);
        tabSpec.setSelected(isSelect);
        tabSpec.setText(text);

        BadgerHelper badgerHelper = tabSpec.getBadgerHelper();
        badgerHelper.setBadgerEnable(false);
        badgerHelper.setBadgerGravity(BadgerHelper.R_T);
        badgerHelper.setTextSize(applyDimension(TypedValue.COMPLEX_UNIT_SP,9));

        badgerHelper.setHorizontalPadding(applyDimension(TypedValue.COMPLEX_UNIT_DIP,22));
        badgerHelper.setVerticalPadding(applyDimension(TypedValue.COMPLEX_UNIT_DIP,4));
        badgerHelper.setBadgerWidth(applyDimension(TypedValue.COMPLEX_UNIT_DIP,4));
        badgerHelper.setBadgerHeight(applyDimension(TypedValue.COMPLEX_UNIT_DIP,4));

        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.MATCH_PARENT, 1f);
        layoutParams.gravity = Gravity.CENTER;
        addView(tabSpec, layoutParams);
        setOnSpecClickListener(tabSpec);
        return tabSpec;
    }

    /**
     * 添加文字与图片spec
     *
     * @param text          提示文字
     * @param drawableResId 图片引用
     */
    public TextView addTextSpec(String text, String tag, @DrawableRes int drawableResId) {
        return addTextSpec(text,tag, ContextCompat.getDrawable(getContext(),drawableResId));
    }



    /**
     * 添加图片spec
     *
     * @param drawableResId
     */
    public void addImageSpec(int drawableResId) {
        Context context = getContext();
        ImageView tabSpec = new ImageView(context);
        tabSpec.setPadding(padding, padding, padding, padding);
        tabSpec.setScaleType(ImageView.ScaleType.FIT_CENTER);
        tabSpec.setImageResource(drawableResId);
        tabSpec.setSelected(0 == getChildCount());
        addView(tabSpec, new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f));
        setOnSpecClickListener(tabSpec);
    }

    /**
     * 设置spec点击事件
     *
     * @param tabSpec
     */
    private void setOnSpecClickListener(View tabSpec) {
        if (null != tabSpec) {
            tabSpec.setOnClickListener(new ViewClickShakeListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int selectPosition = indexOfChild(v);
                    if(null == onTabSelectListener || onTabSelectListener.isTabSelect(v, selectPosition)){
                        setSelectPosition(selectPosition);
                    }
                }
            }));
        }
    }

    public void setSelectPosition(int position) {
        if (null != listener) {
            if (position != lastPosition) {
                setItemSelected(position, true);
                setItemSelected(lastPosition, false);
            }
            listener.onTabItemClick(getChildAt(position), position, lastPosition);
            lastPosition = position;
        }
    }


    /**
     * 设置指定tab选中tab
     *
     * @param position 指定tab
     * @param isSelect 当前view是否选中
     */
    public void setItemSelected(int position, boolean isSelect) {
        if (position >= getChildCount()) return;
        View selectView = getChildAt(position);
        if (selectView instanceof TextView) {
            //之所以不用colorStateDrawable,是因为用颜色偏移,可以实现颜色渐变,
            selectView.setSelected(isSelect);
            ((TextView) selectView).setTextColor(isSelect ? selectColor : color);
        } else if (selectView instanceof ImageView) {
            selectView.setSelected(isSelect);
            selectView.setSelected(isSelect);
        }
    }


    /**
     * 设置tab条目点击事件
     *
     * @param listener 点击回调对象
     */
    public void setOnTabItemClickListener(OnTabItemClickListener listener) {
        this.listener = listener;
    }



    public void setOnTabSelectListener(OnTabSelectListener listener){
        this.onTabSelectListener=listener;
    }

    /**
     * tab条目点击监听回调接口
     */
    public interface OnTabItemClickListener {
        /**
         * tab条目点击事件
         *
         * @param v        点击view对象
         * @param position 点击位置
         */
        void onTabItemClick(View v, int position, int lastPosition);
    }

    public interface OnTabSelectListener{
        boolean isTabSelect(View v, int position);
    }
}
