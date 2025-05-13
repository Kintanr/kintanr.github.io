
<template>
  <UApp>
    <div class="p-10 md:p-20">
      <div class="flex md:mb-35 mb-30">
        <div
          class="font-bold bg-gradient-to-r from-yellow-500 to-indigo-950 dark:to-indigo-500 bg-clip-text text-transparent md:text-left text-center"
        >
          <div class="md:text-6xl text-4xl">Kintan here —</div>
          <div class="md:text-5xl text-3xl md:leading-[1.3]">
            Membuat web gak cuma fungsional, tapi juga menarik
          </div>
        </div>
      </div>

      <UCard class="mt-20 bg-indigo-950 text-white">
        <div class="flex md:flex-row flex-col items-center text-center">
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
                v-if="item?.item"
                size="full"
                class="object-cover"
                :src="item.item"
              />
            </UCarousel>
          </div>

          <div class="md:ml-3 mb-4 text-sky-500 font-bold">
            Kintan Umari · Frontend Developer
          </div>
        </div>

        <div class="grid grid-cols-6 gap-8">
          <div class="col-span-6 md:col-span-4 md:text-start text-center">
            Hi, saya Kintan — Mengembangkan berbagai antarmuka pengguna yang
            responsif dan user-friendly, serta bekerja dengan berbagai teknologi
            modern di dunia web development. Selalu antusias, suka tantangan,
            dan haus hal baru. Buat saya, jadi developer bukan cuma soal
            ngoding, tapi tumbuh bareng teknologi yang terus berubah.
          </div>
          <div class="col-span-6 md:col-span-2 justify-items-center">
            <div>
              <div class="font-bold text-xl">Lets Connect</div>
              <div class="flex flex-wrap gap-x-4 mt-2">
                <a
                  v-for="(data, key) in socials"
                  :key="key"
                  :href="
                    containsHttps(data.link) ? data.link : 'mailto:' + data.link
                  "
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
        <div class="text-2xl font-bold">What I do</div>
        <div class="grid grid-cols-6 gap-8 mt-5">
          <div class="col-span-6 md:col-span-3">
            Bertanggung jawab untuk membangun dan mendesain elemen-elemen
            antarmuka pengguna (user interface) yang interaktif dan responsif,
            sekaligus mengoptimalkan performa dan efisiensi aplikasi. Teknologi
            yang biasa saya gunakan termasuk
            <span class="text-sky-500">Nuxt.js</span>,
            <span class="text-sky-500">CodeIgniter 3 (CI3)</span>, dan berbagai
            framework CSS seperti <span class="text-sky-500"> Tailwind </span>,
            <span class="text-sky-500">Bootstrap</span>,
            <span class="text-sky-500">Vuetify</span>, dan lainnya. Selain itu,
            berkolaborasi dengan tim backend untuk mengkonsumsi data dari
            <span class="text-sky-500">API</span>.
          </div>
          <div class="col-span-6 md:col-span-3">
            <div class="flex flex-wrap gap-5">
              <template v-for="(skill, key) in skills" :key="key + 'skill'">
                <UTooltip :text="skill.title">
                  <span
                    class="bg-white rounded-lg py-2 px-3 flex items-center drop-shadow-xl dark:drop-shadow-none"
                  >
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

      <section class="md:mt-25 mt-15">
        <div class="grid grid-cols-2 gap-8 items-center">
          <div
            class="col-span-2 md:col-span-1 hidden md:block relative justify-items-center"
          >
            <img
              :src="star"
              class="absolute top-1/9 left-1/12 rotate-30"
              width="40"
              v-gsap.parallax.slower-10
            />

            <img
              :src="star"
              class="absolute top-1/4 left-1/3 rotate-75"
              width="25"
              v-gsap.parallax.faster-10
            />

            <img
              :src="star"
              class="absolute top-1/4 right-1/9 rotate-45"
              width="35"
              v-gsap.parallax.slower-20
            />

            <img
              :src="star"
              class="absolute bottom-1/9 right-1/5 rotate-27"
              width="30"
              v-gsap.parallax.slower
            />

            <img
              :src="star"
              class="absolute bottom-1/6 left-1/5 rotate-13"
              width="33"
              v-gsap.parallax.faster-20
            />

            <div class="w-100 h-100 relative flex items-center justify-center">
              <img
                :src="work_light"
                class="absolute z-3 hidden dark:block"
                width="370"
              />
              <img
                :src="work_dark"
                class="absolute z-3 block dark:hidden"
                width="370"
              />
              <img
                :src="gear_light"
                class="absolute top-1/22 right-1/10 z-1 animate-[spin_9s_linear_infinite] hidden dark:block z-2"
                width="160"
              />
              <img
                :src="gear_dark"
                class="absolute top-1/22 right-1/10 z-1 animate-[spin_9s_linear_infinite] block dark:hidden z-2"
                width="160"
              />
            </div>
          </div>

          <div class="col-span-2 md:col-span-1">
            <div class="text-2xl font-bold">Pengalaman Bekerja</div>
            <UStepper
              orientation="vertical"
              disabled
              color="secondary"
              :items="items"
              class="w-full mt-5"
            >
              <template #indicator="{ item, key }">
                <div
                  v-if="item?.icon"
                  class="relative flex items-center justify-center size-full"
                >
                  <span
                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-700 opacity-75"
                  ></span>
                  <UIcon :name="item?.icon" class="text-lg" />
                </div>
                <div v-else></div>
              </template>

              <template #description="{ item }">
                <div class="mb-5">
                  <div class="font-bold">
                    {{ item?.subtitle }}
                  </div>
                  {{ item?.description }}
                </div>
              </template>
            </UStepper>
          </div>
        </div>
      </section>

      <section class="mt-15">
        <div class="text-2xl font-bold">Projects</div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 justify-between">
          <UCard
            class="dark:bg-indigo-950 border-1 border-slate-200 dark:border-none"
            v-for="(project, key) in projects"
            :key="key + 'project'"
          >
            <div class="">
              <img
                @click="previewImage(project.image)"
                :src="project.image"
                class="rounded-lg aspect-3/2 object-cover"
              />

              <div class="flex flex-wrap gap-2 my-3">
                <template
                  v-for="(data, key) in project.tech"
                  :key="key + 'skill'"
                >
                  <UTooltip :text="data.title">
                    <span
                      class="bg-white rounded-lg py-2 px-3 flex items-center border-2 border-slate-200 dark:border-none"
                    >
                      <img :src="data.icon" width="18" />
                    </span>
                  </UTooltip>
                </template>
              </div>

              <div class="">
                <div
                  class="text-l text-gray-600 dark:text-gray-400 font-medium"
                >
                  {{ project.sub_title }}
                </div>
                <div class="mb-3 text-xl text-sky-500 font-medium">
                  {{ project.title }}
                </div>
                <div>
                  {{ project.description }}
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </section>

      <section class="mt-15">
        <div class="text-2xl font-bold">Training dan Sertifikat</div>

        <div class="flex flex-wrap gap-12 mt-5">
          <div
            class="md:w-120 w-full"
            v-for="(certificate, key) in certification"
            :key="key + 'cert'"
          >
            <div>
              <Swiper
                class="drop-shadow-xl dark:drop-shadow-none"
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

            <div class="mt-5 text-center">
              <div class="text-l text-gray-600 dark:text-gray-400 font-medium">
                {{ certificate.institution }}
              </div>
              <div class="mb-3 text-xl text-sky-500 font-medium">
                {{ certificate.title }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <UModal v-model:open="open" class="!max-w-[900px]">
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
import github from "~/assets/images/github.png";
import gmail from "~/assets/images/gmail.png";

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
import redis from "~/assets/images/redis_icon.png";
import vuetify from "~/assets/images/vuetify.png";
import codeigniter from "~/assets/images/codeigniter.png";

import banner from "~/assets/images/banner.png";
import certificate_1 from "~/assets/images/certificate-1.jpg";
import certificate_2 from "~/assets/images/certificate-2.jpg";
import coursera from "~/assets/images/coursera.jpg";

import work_light from "~/assets/images/work-light.png";
import work_dark from "~/assets/images/work-dark.png";
import gear_light from "~/assets/images/gear-light.png";
import gear_dark from "~/assets/images/gear-dark.png";

import star from "~/assets/images/star.png";

import btn from "~/assets/images/proj-BTN.jpg";
import ingenium from "~/assets/images/proj-Ingenium.png";
import airnav from "~/assets/images/proj-Airnav.jpg";
import taspen_itms from "~/assets/images/proj-Taspen.jpg";
import taspen_daily from "~/assets/images/proj-Taspen2.jpg";
import sigma from "~/assets/images/proj-Sigma.jpg";
import sigma2 from "~/assets/images/sidex.jpg";
import taspen_ned from "~/assets/images/proj-NED.jpg";
import peruri from "~/assets/images/peruri.jpg";

const carousel = ["/images/profile1.JPG", "/images/profile2.jpg"];

useHead({
  titleTemplate: "Kintan Umari",
});

// const carousel = [
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR37jdizdpf1_waSOBbNiSZnN8qOKcz1QW_kQ&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWQXKMWp7pjg1IvDzEvS8EKpDo9vrTILcgyg&s",
// ];

const certification = [
  {
    title: "React Developer",
    start_date: "date",
    end_date: "date",
    institution: "Professional Academy · Kominfo",
    image: [certificate_1, certificate_2],
  },
  {
    title: "Google Project Management",
    start_date: "date",
    end_date: "date",
    institution: "Coursera",
    image: [coursera],
  },
];

const items = ref<StepperItem[]>([
  {
    title: "PT. Sigma Cipta Caraka (Telkomsigma)",
    description: "Aug 2021 – Present",
    subtitle: "Frontend Developer",
    icon: "i-ph-map-pin-fill",
  },
  {
    title: "PT Pertamina Persero",
    subtitle: "Internship Full Stack Developer",
    description: "Feb 2021 – Apr 2021",
  },
]);

const socials = [
  {
    icon: linkedin,
    link: "https://www.linkedin.com/in/kintan-umari-7a58911bb/",
  },
  {
    icon: github,
    link: "https://github.com/Kintanr",
  },
  {
    icon: gmail,
    link: "kintanumari178@gmail.com",
  },
];

function containsHttps(text: string | string[]) {
  return text.includes("https");
}

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
    icon: vuetify,
    title: "Vuetify",
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
    icon: codeigniter,
    title: "Codeigniter",
  },
  {
    icon: postgre,
    title: "Postgre Sql",
  },
  {
    icon: mysql,
    title: "MySql",
  },
  {
    icon: redis,
    title: "Redis",
  },
];

const projects = [
  {
    image: btn,
    tech: [
      {
        icon: bulma,
        title: "Bulma",
      },
      {
        icon: nuxtjs,
        title: "Nuxt.js",
      },
    ],
    title: "Integrated Talent Management System BTN",
    sub_title: "Full Cycle",
    description:
      "Mengembangkan antarmuka pengguna untuk modul karir dalam sistem Integrated Talent Management System milik Bank Tabungan Negara (BTN). Fokus utama proyek ini adalah merancang tampilan yang responsif, intuitif, dan sesuai dengan identitas visual perusahaan. Pengembangan dilakukan secara menyeluruh mulai dari desain, implementasi, hingga optimalisasi UI menggunakan Nuxt.js dan Bulma sebagai framework utama.",
  },
  {
    image: airnav,
    tech: [
      {
        icon: vuetify,
        title: "Vuetify",
      },
      {
        icon: nuxtjs,
        title: "Nuxt.js",
      },
    ],
    title: "Integrated Talent Management System AirNav Indonesia",
    sub_title: "Support",
    description:
      "Berperan sebagai pengembang antarmuka pengguna dalam mendukung pengembangan sistem Integrated Talent Management System milik AirNav Indonesia. Tugas meliputi penyempurnaan tampilan, penyesuaian komponen UI, serta perbaikan fungsionalitas frontend berdasarkan kebutuhan pengguna. Pengembangan dilakukan menggunakan Nuxt.js dan Vuetify untuk memastikan konsistensi dan kemudahan akses pada berbagai perangkat.",
  },
  {
    image: ingenium,
    tech: [
      {
        icon: bulma,
        title: "Bulma",
      },
      {
        icon: nuxtjs,
        title: "Nuxt.js",
      },
    ],
    title: "Landing Page Ingenium",
    sub_title: "Internal",
    description:
      "Mendesain dan mengembangkan landing page untuk memperkenalkan produk Ingenium milik PT Telkomsigma. Halaman ini dirancang untuk memberikan kesan profesional serta menyampaikan informasi secara efektif kepada pengguna internal perusahaan. Proyek ini menggunakan Nuxt.js dengan Bulma untuk menciptakan antarmuka yang bersih, modern, dan mudah digunakan.",
  },
  {
    image: taspen_itms,
    tech: [
      {
        icon: bulma,
        title: "Bulma",
      },
      {
        icon: nuxtjs,
        title: "Nuxt.js",
      },
    ],
    title: "Integrated Talent Management System Taspen",
    sub_title: "Full Cycle",
    description:
      "Melakukan pengembangan antarmuka frontend untuk modul manajemen talenta dan karir dalam sistem Integrated Talent Management System milik PT Taspen (Persero). Proyek ini mencakup pembuatan dashboard serta layout antarmuka, integrasi komponen UI, serta penyempurnaan interaksi pengguna agar sesuai dengan standar usability perusahaan dan mudah diakses oleh seluruh karyawan.",
  },
  {
    image: taspen_daily,
    tech: [
      {
        icon: bulma,
        title: "Bulma",
      },
      {
        icon: nuxtjs,
        title: "Nuxt.js",
      },
    ],
    title: "Daily Taspen",
    sub_title: "Full Cycle",
    description:
      "Mengembangkan aplikasi web internal bernama Daily Taspen yang berfungsi sebagai media sosial perusahaan untuk meningkatkan komunikasi antar karyawan. Tanggung jawab mencakup perancangan desain yang menarik, implementasi antarmuka yang ramah pengguna, serta memastikan kompatibilitas dengan berbagai perangkat. Framework Nuxt.js dan Bulma digunakan untuk mendukung tampilan modern dan interaktif.",
  },
  {
    image: taspen_ned,
    tech: [
      {
        icon: codeigniter,
        title: "Codeigniter",
      },
      {
        icon: redis,
        title: "Redis",
      },
    ],
    title: "Taspen NED",
    sub_title: "Full Cycle",
    description:
      "Melakukan penyesuaian antarmuka pengguna pada aplikasi NED, sebuah sistem milik PT Taspen (Persero) yang digunakan untuk pengelolaan dan pembayaran dana pensiun. Tugas utama mencakup penyesuaian frontend terhadap perubahan environment, khususnya dalam memigrasikan mekanisme manajemen sesi pengguna ke Redis, serta merombak sistem penyimpanan captcha agar terintegrasi dengan Google Cloud Storage. Penyesuaian ini dilakukan tanpa mengubah logika bisnis utama, dengan memastikan antarmuka tetap stabil, aman, dan efisien di lingkungan cloud.",
  },
  {
    image: sigma,
    tech: [
      {
        icon: bulma,
        title: "Bulma",
      },
      {
        icon: nuxtjs,
        title: "Nuxt.js",
      },
    ],
    title: "Integrated Talent Management System Telkomsigma",
    sub_title: "Full Cycle",
    description:
      "Mengembangkan tampilan antarmuka untuk sistem manajemen talenta dan pengembangan karir karyawan di PT Telkomsigma. Proyek ini melibatkan desain halaman-halaman yang kompleks dan integrasi berbagai komponen visual menggunakan Nuxt.js dan Bulma, dengan fokus pada user experience yang profesional dan fungsional.",
  },
  {
    image: sigma2,
    tech: [
      {
        icon: bootstrap,
        title: "Bootstrap",
      },
      {
        icon: nuxtjs,
        title: "Nuxt.js",
      },
    ],
    title: "Learning Management System Telkomsigma",
    sub_title: "Full Cycle",
    description:
      "Menerapkan desain ulang pada antarmuka pengguna sistem Learning Management System (LMS) 'side-x' milik PT Telkomsigma. Proyek ini berfokus pada penyelarasan tampilan dengan panduan desain perusahaan, serta peningkatan kemudahan navigasi dan aksesibilitas pengguna menggunakan Nuxt.js dan Vuetify.",
  },
  {
    image: peruri,
    tech: [
      {
        icon: bulma,
        title: "Bulma",
      },
      {
        icon: nuxtjs,
        title: "Nuxt.js",
      },
    ],
    title: "Integrated Talent Management System Peruri",
    sub_title: "Support",
    description:
      "Melakukan pengembangan dan optimalisasi antarmuka pengguna pada modul talent dan career dalam sistem Integrated Talent Management System milik Peruri. Fokus utama proyek ini adalah melakukan berbagai peningkatan (enhancement) terhadap fitur-fitur yang telah ada, memperbaiki performa tampilan, serta memastikan konsistensi visual dan usability pada berbagai perangkat. Pengembangan dilakukan menggunakan Nuxt.js, Vue.js, dan Sass untuk menciptakan UI yang modern, responsif, serta selaras dengan kebutuhan pengguna korporat.",
  },
];
const open = ref(false);
const imagePrev = ref(null);

function previewImage(image: any) {
  open.value = true;
  imagePrev.value = image;
}
</script>
