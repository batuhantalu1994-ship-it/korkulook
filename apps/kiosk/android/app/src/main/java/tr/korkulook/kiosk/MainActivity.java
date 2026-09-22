package tr.korkulook.kiosk;

import android.Manifest;
import android.os.Bundle;
import android.webkit.PermissionRequest;
import androidx.core.app.ActivityCompat;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebChromeClient;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    ActivityCompat.requestPermissions(
      this,
      new String[] { Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO },
      1821
    );
  }

  @Override
  public void onStart() {
    super.onStart();
    if (getBridge() == null || getBridge().getWebView() == null) return;
    getBridge()
      .getWebView()
      .setWebChromeClient(
        new BridgeWebChromeClient(getBridge()) {
          @Override
          public void onPermissionRequest(final PermissionRequest request) {
            runOnUiThread(() -> request.grant(request.getResources()));
          }
        }
      );
  }
}
