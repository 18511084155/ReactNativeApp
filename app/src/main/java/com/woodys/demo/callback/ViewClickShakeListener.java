package com.woodys.demo.callback;

import android.view.View;
import android.view.View.OnClickListener;

import com.woodys.demo.utils.ViewHelper;


/**
 * view shake click listener
 * 
 * @author momo
 * @Date 2014/11/21
 * 
 */
public class ViewClickShakeListener implements OnClickListener {
	private final OnClickListener listener;

	public ViewClickShakeListener(OnClickListener listener) {
		this.listener = listener;
	}

	@Override
	public void onClick(final View v) {
		ViewHelper.viewDrawableShake(v);
		if (null != listener) {
			listener.onClick(v);
		}
	}

}
