document.addEventListener("DOMContentLoaded", function () {
  const positions = [
    {
      top: "0%",
      left: "0%",
    },
    {
      top: "0%",
      left: "10%",
    },
    {
      top: "0%",
      left: "60%",
    },
    {
      top: "16%",
      left: "15%",
    },
    {
      top: "16%",
      left: "40%",
    },
    {
      top: "16%",
      left: "90%",
    },
    {
      top: "32%",
      left: "50%",
    },
    {
      top: "32%",
      left: "75%",
    },
    {
      top: "48%",
      left: "0%",
    },
    {
      top: "64%",
      left: "30%",
    },
    {
      top: "64%",
      left: "50%",
    },
    {
      top: "64%",
      left: "90%",
    },
    {
      top: "80%",
      left: "20%",
    },
    {
      top: "80%",
      left: "70%",
    },
  ];

  const imgs = document.querySelectorAll(".img");

  gsap.set(".img", {
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });
});
