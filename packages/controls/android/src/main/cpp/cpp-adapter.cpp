#include <jni.h>
#include "reactnativevideo_controlsOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::reactnativevideo_controls::initialize(vm);
}
