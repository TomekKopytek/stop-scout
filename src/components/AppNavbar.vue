<template>
  <nav class="bg-slate-900 text-white shadow">
    <div class="max-w-6xl mx-auto p-4 flex justify-between">
      <h1 class="text-xl font-bold">
        Stop Scout
      </h1>

      <div class="flex gap-4">
        <RouterLink to="/dashboard">
          Dashboard
        </RouterLink>

        <RouterLink to="/login">
          Login
        </RouterLink>
      </div>
    </div>
  </nav>
</template>