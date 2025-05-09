
<template>
  <UApp>
    <div class="p-10 md:p-20">
      <div class="flex md:mb-35 mb-30">
        <div
          class="font-bold bg-gradient-to-r from-yellow-500 to-indigo-500 bg-clip-text text-transparent md:text-left text-center"
        >
          <div class="md:text-6xl text-4xl">Kintan here —</div>
          <div class="md:text-5xl text-3xl">
            Membuat web gak cuma fungsional, tapi juga menarik
          </div>
        </div>
      </div>

      <UCard class="mt-20 bg-indigo-950">
        <div class="flex">
          <div class="w-42 aspect-square -mt-24">
            <UCarousel
              v-slot="item"
              fade
              loop
              :autoplay="{ delay: 4000 }"
              :items="carousel"
              class="w-full h-full rounded-full overflow-hidden border-8 border-indigo-950"
            >
              <UAvatar
                v-if="item.item"
                size="full"
                class="object-cover"
                :src="item.item"
              />
            </UCarousel>
          </div>

          <div class="ml-3">Lorem ipsum dolor sit amet,</div>
        </div>

        <div class="grid grid-cols-6 gap-8">
          <div class="col-span-6 md:col-span-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div
            class="col-span-6 md:col-span-2 justify-items-start md:justify-items-center"
          >
            <div>
              <div class="font-bold text-xl">Lets Connect</div>
              <div class="flex flex-wrap gap-x-2 mt-2">
                <a
                  v-for="(data, key) in socials"
                  :key="key"
                  :href="data.link"
                  class="flex-none"
                  target="_blank"
                >
                  <img :src="data.icon" width="30" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <section class="mt-15">
        <div class="text-xl font-bold">What I do</div>
        <div class="grid grid-cols-6 gap-8 mt-5">
          <div class="col-span-6 md:col-span-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </div>
          <div class="col-span-6 md:col-span-3">
            <div class="flex flex-wrap gap-5">
              <template v-for="(skill, key) in skills" :key="key + 'skill'">
                <UTooltip :text="skill.title">
                  <span class="bg-white rounded-lg py-2 px-3 flex items-center">
                    <img
                      :src="skill.icon"
                      width="23"
                      class="object-cover aspect-auto"
                    />
                  </span>
                </UTooltip>
              </template>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-25">
        <div class="grid grid-cols-2 gap-8 items-center">
          <div
            class="col-span-2 md:col-span-1 hidden md:block justify-items-center"
          >
            <div class="w-100 h-100 relative flex items-center justify-center">
              <img
                :src="work_light"
                class="absolute z-2 hidden dark:block"
                width="370"
              />
              <img
                :src="work_dark"
                class="absolute z-2 block dark:hidden"
                width="370"
              />
              <img
                :src="gear_light"
                class="absolute top-1/22 right-1/10 z-1 animate-[spin_9s_linear_infinite] hidden dark:block"
                width="160"
              />
              <img
                :src="gear_dark"
                class="absolute top-1/22 right-1/10 z-1 animate-[spin_9s_linear_infinite] block dark:hidden"
                width="160"
              />
            </div>
          </div>

          <div class="col-span-2 md:col-span-1">
            <div class="text-xl font-bold">Pengalaman Bekerja</div>
            <UStepper
              orientation="vertical"
              disabled
              color="secondary"
              :items="items"
              class="w-full mt-5"
            >
              <template #indicator="{ item, key }">
                <div
                  v-if="item.icon"
                  class="relative flex items-center justify-center size-full"
                >
                  <span
                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-700 opacity-75"
                  ></span>
                  <UIcon :name="item.icon" class="text-lg" />
                </div>
                <div v-else></div>
              </template>

              <template #description="{ item }">
                <div class="mb-5">
                  {{ item.description }}
                </div>
              </template>
            </UStepper>
          </div>
        </div>
      </section>

      <section class="mt-15">
        <div class="text-xl font-bold">Projects</div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 justify-between">
          <UCard
            class="bg-indigo-950"
            v-for="(project, key) in projects"
            :key="key + 'project'"
          >
            <div class="">
              <img :src="banner" class="rounded-lg aspect-3/2 object-cover" />

              <div class="flex flex-wrap gap-2 my-3">
                <template v-for="(i, key) in 2" :key="key + 'skill'">
                  <UTooltip :text="skills[i].title">
                    <span
                      class="bg-white rounded-lg py-2 px-3 flex items-center"
                    >
                      <img :src="skills[i].icon" width="18" />
                    </span>
                  </UTooltip>
                </template>
              </div>

              <div class="">
                <div class="mb-3 text-xl">{{ project.sub_title }}</div>
                <div class="mb-3 text-2xl">{{ project.title }}</div>
                <div>
                  {{ project.description }}
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </section>

      <section class="mt-15">
        <div class="text-xl font-bold">Training dan Sertifikat</div>

        <div class="flex flex-wrap gap-12 mt-5">
          <div
            class="md:w-120 w-full"
            v-for="(certificate, key) in certification"
            :key="key + 'cert'"
          >
            <div>
              <Swiper
                :effect="'cards'"
                :grabCursor="true"
                :modules="[EffectCards]"
              >
                <SwiperSlide
                  v-for="(img, i) in certificate.image"
                  :key="i"
                  class="flex justify-items-center"
                >
                  <img
                    :src="img"
                    class="rounded-lg aspect-3/2 object-cover"
                    @click="previewImage(img)"
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            <div>
              <div class="mb-3 text-xl">{{ certificate.institution }}</div>
              <div class="mb-3 text-2xl">{{ certificate.title }}</div>
            </div>
          </div>
        </div>
      </section>

      <UModal v-model:open="open" class="!max-w-[800px]">
        <template #content>
          <img :src="imagePrev" class="rounded-lg" />
        </template>
      </UModal>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { StepperItem } from "@nuxt/ui";

import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";

import linkedin from "~/assets/images/linkedin.png";
import instagram from "~/assets/images/instagram.png";

import bootstrap from "~/assets/images/Bootstrap.png";
import html from "~/assets/images/html-5.png";
import bulma from "~/assets/images/bulma.svg";
import js from "~/assets/images/js.png";
import nuxtjs from "~/assets/images/nuxtjs.svg";
import php from "~/assets/images/php.png";
import sass from "~/assets/images/sass.png";
import tailwind from "~/assets/images/Tailwind.png";
import postgre from "~/assets/images/postgresql.png";
import mysql from "~/assets/images/mysql.png";
import react from "~/assets/images/react.png";

import banner from "~/assets/images/banner.png";
import certificate_1 from "~/assets/images/certificate-1.jpg";
import certificate_2 from "~/assets/images/certificate-2.jpg";
import coursera from "~/assets/images/coursera.jpg";

import work_light from "~/assets/images/work-light.png";
import work_dark from "~/assets/images/work-dark.png";
import gear_light from "~/assets/images/gear-light.png";
import gear_dark from "~/assets/images/gear-dark.png";

const carousel = ["/images/profile1.JPG", "/images/profile2.jpg"];

// const carousel = [
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR37jdizdpf1_waSOBbNiSZnN8qOKcz1QW_kQ&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWQXKMWp7pjg1IvDzEvS8EKpDo9vrTILcgyg&s",
// ];

const images = [certificate_1, certificate_2];

const certification = [
  {
    title: "certificate - title",
    start_date: "date",
    end_date: "date",
    institution: "institution",
    image: [certificate_1, certificate_2],
  },
  {
    title: "certificate - title",
    start_date: "date",
    end_date: "date",
    institution: "institution",
    image: [coursera],
  },
];

const items = ref<StepperItem[]>([
  {
    title: "Address",
    description: "Add your address here",
    icon: "i-ph-map-pin-fill",
  },
  {
    title: "Shipping",
    description: "Set your preferred shipping method",
  },
]);

const socials = [
  {
    icon: linkedin,
    link: "https://www.linkedin.com/in/kintan-umari-7a58911bb/",
  },
  {
    icon: instagram,
    link: "https://www.instagram.com/kintan_mari/",
  },
];

const skills = [
  {
    icon: html,
    title: "Html",
  },
  {
    icon: js,
    title: "Javascript",
  },
  {
    icon: sass,
    title: "Sass",
  },
  {
    icon: bootstrap,
    title: "Bootstrap",
  },
  {
    icon: bulma,
    title: "Bulma",
  },
  {
    icon: tailwind,
    title: "Tailwind",
  },
  {
    icon: nuxtjs,
    title: "Nuxt.js",
  },
  {
    icon: react,
    title: "React.js",
  },
  {
    icon: php,
    title: "Php",
  },
  {
    icon: postgre,
    title: "Postgre Sql",
  },
  {
    icon: mysql,
    title: "MySql",
  },
];

const projects = [
  {
    title: "Project Title",
    sub_title: "Maintenance",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor i",
  },
  {
    title: "Project Title",
    sub_title: "Web Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco",
  },
  {
    title: "Project Title",
    sub_title: "Web Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco",
  },
  {
    title: "Project Title",
    sub_title: "Web Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco",
  },
];
const open = ref(false);
const imagePrev = ref(null);

function previewImage(image: any) {
  open.value = true;
  imagePrev.value = image;
}
</script>
