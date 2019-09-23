<template>
  <v-container class="pa-0">
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-hover>
          <v-card
            slot-scope="{ hover }"
          >
            <v-img
              :src="require('@/assets/new1.jpg')"
              :gradient="hover ? `rgba(0,0,0,0.4), rgba(0,0,0,0.4)` : ``"
              max-width="100%"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="overlay d-flex fill-height"
                >
                  <h4 class="display-1">Apple Watch Nike</h4>
                </div>
              </v-expand-transition>

              <v-row class="fill-height">
                <v-col>
                  <v-chip
                    label
                    dark
                    :small="$vuetify.breakpoint.xsOnly"
                    class="ml-4"
                  >
                    Apple
                  </v-chip>
                </v-col>

                <v-col
                  align-self="end"
                  class="text-right"
                >
                  <v-hover>
                    <v-btn
                      slot-scope="{ hover }"
                      :small="$vuetify.breakpoint.xsOnly"
                      :color="hover ? `primary` : `white`"
                      class="mr-4"
                      to="/productinfo/syW3cSDVZnoILXmqcB1u/Apple%20Watch%20Nike"
                    >
                      了解詳情
                    </v-btn>
                  </v-hover>
                </v-col>
              </v-row>

            </v-img>
          </v-card>
        </v-hover>
      </v-col>


      <v-col
        cols="12"
        sm="6"
      >
        <v-hover>
          <v-card
            slot-scope="{ hover }"
          >
            <v-img
              :src="require('@/assets/new2.jpg')"
              :gradient="hover ? `rgba(0,0,0,0.4), rgba(0,0,0,0.4)` : ``"
              max-width="100%"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="overlay d-flex fill-height"
                >
                  <h4 class="display-1">Galaxy Watch Active</h4>
                </div>
              </v-expand-transition>

              <v-row class="fill-height">
                <v-col>
                  <v-chip
                    label
                    dark
                    :small="$vuetify.breakpoint.xsOnly"
                    class="ml-4"
                  >
                    Samsung
                  </v-chip>
                </v-col>

                <v-col
                  align-self="end"
                  class="text-right"
                >
                  <v-hover>
                    <v-btn
                      slot-scope="{ hover }"
                      :small="$vuetify.breakpoint.xsOnly"
                      :color="hover ? `primary` : `white`"
                      class="mr-4"
                      to="/productinfo/Lf96KV943e8E7aswe5Xi/Galaxy%20Watch%20Active"
                    >
                      了解詳情
                    </v-btn>
                  </v-hover>
                </v-col>
              </v-row>

            </v-img>
          </v-card>
        </v-hover>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'MainProducts',
};
</script>

<style lang="scss" scoped>

.overlay {
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
}

</style>
