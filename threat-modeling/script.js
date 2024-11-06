document
  .getElementById("dreadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const threat = document.getElementById("threat").value;
    const damage = parseInt(document.getElementById("damage").value);
    const reproducibility = parseInt(
      document.getElementById("reproducibility").value
    );
    const exploitability = parseInt(
      document.getElementById("exploitability").value
    );
    const affectedUsers = parseInt(
      document.getElementById("affectedUsers").value
    );
    const discoverability = parseInt(
      document.getElementById("discoverability").value
    );

    const dreadScores = {
      Damage: damage,
      Reproducibility: reproducibility,
      Exploitability: exploitability,
      "Affected Users": affectedUsers,
      Discoverability: discoverability,
    };
    const totalScore =
      damage +
      reproducibility +
      exploitability +
      affectedUsers +
      discoverability;
    const riskLevel =
      totalScore > 30
        ? "High Risk"
        : totalScore > 20
        ? "Moderate Risk"
        : "Low Risk";

    displayChart(dreadScores);
    displayAnalysisResult(totalScore, riskLevel, threat);
  });

function displayChart(dreadScores) {
  const ctx = document.getElementById("dreadChart").getContext("2d");

  // Periksa apakah dreadChart sudah didefinisikan dan merupakan instance Chart
  if (window.dreadChart instanceof Chart) {
    window.dreadChart.destroy();
  }

  window.dreadChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(dreadScores),
      datasets: [
        {
          label: "DREAD Score",
          data: Object.values(dreadScores),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
        },
      },
    },
  });
}

function displayAnalysisResult(totalScore, riskLevel, threat) {
  const analysisResult = document.getElementById("analysisResult");
  analysisResult.innerHTML = `
      <h3>Analysis Result</h3>
      <p>Threat: ${threat}</p>
      <p>Total DREAD Score: ${totalScore}</p>
      <p>Risk Level: ${riskLevel}</p>
      <p>
        ${
          riskLevel === "High Risk"
            ? "Consider immediate mitigation strategies to reduce risk."
            : ""
        }
        ${
          riskLevel === "Moderate Risk"
            ? "Review and improve security measures as needed."
            : ""
        }
        ${
          riskLevel === "Low Risk"
            ? "Risk level acceptable, but monitor for any changes."
            : ""
        }
      </p>
    `;
}
