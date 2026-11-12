package com.hovang.cotuong;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private final androidx.activity.result.ActivityResultLauncher<String> notificationPermission =
        registerForActivityResult(
            new androidx.activity.result.contract.ActivityResultContracts.RequestPermission(),
            granted -> {
                // Permission is optional. HOVANG continues regardless of the choice.
            }
        );

    @Override
    protected void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (android.os.Build.VERSION.SDK_INT >= 33 &&
            androidx.core.content.ContextCompat.checkSelfPermission(
                this,
                android.Manifest.permission.POST_NOTIFICATIONS
            ) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
            notificationPermission.launch(
                android.Manifest.permission.POST_NOTIFICATIONS
            );
        }
    }
}
