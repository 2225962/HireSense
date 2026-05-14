module.exports = async function (context, req) {
    const method = req.method;

    // =========================
    // POST = SAVE APPLICANT
    // =========================
    if (method === "POST") {
        const { name, score, decision } = req.body;

        const item = {
            PartitionKey: "applicants",
            RowKey: Date.now().toString(),
            name,
            score,
            decision
        };

        context.bindings.outputTable = item;

        context.res = {
            status: 200,
            body: { message: "Saved successfully" }
        };
    }

    // =========================
    // GET = FETCH HISTORY
    // =========================
    if (method === "GET") {
        context.res = {
            status: 200,
            body: context.bindings.inputTable
        };
    }
};
