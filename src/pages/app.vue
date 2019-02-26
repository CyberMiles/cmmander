<template>
    <section>
        
        <b-tabs v-model="activeTab">
            <b-tab-item label="Transfer">
                <transfer></transfer>
            </b-tab-item>

            <b-tab-item label="Verify">
				<verify></verify>
            </b-tab-item>

            <b-tab-item label="Activate">
				<activate></activate>
            </b-tab-item>

            <b-tab-item label="Deactivate">
				<deactivate></deactivate>
            </b-tab-item>

            <b-tab-item label="Abort">
				<abort></abort>
            </b-tab-item>

            <b-tab-item label="Withdraw">
				<withdraw></withdraw>
            </b-tab-item>

            <b-tab-item label="CompRate">
				<compRate></compRate>
            </b-tab-item>

            <b-tab-item label="Update">
				<update></update>
            </b-tab-item>

            <b-tab-item label="Shift">
				<shift></shift>
            </b-tab-item>

            <b-tab-item label="Accept">
				<accept></accept>
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
	import Transfer from './transfer.vue'
	import Verify from './verify.vue'
	import Activate from './activate.vue'
	import Deactivate from './deactivate.vue'
	import Withdraw from './withdraw.vue'
	import CompRate from './comprate.vue'
	import Update from './update.vue'
	import Shift from './shift.vue'
	import Accept from './accept.vue'
    import Abort from './abort.vue'
    export default {
        data() {
            return {
                activeTab: 0
            }
        },
		components: {
			Transfer,
			Verify,
			Activate,
			Deactivate,
            Abort,
			Withdraw,
            CompRate,
            Update,
            Shift,
            Accept
		},
		methods: {
			getCmtTx(hash, txs) {
                this.$http.get('/getcmttx?hash=' + hash)
                .then((response) => {
                    let d = response.data
                    if (d && !d.blockNumber) {
                        setTimeout( () => {
                            this.getCmtTx(hash, txs)
                        }, 10000)
                    }
                    for (let i in txs) {
                        if (txs[i].hash == hash) {
                            txs.splice(i, 1, {hash:hash, body:JSON.stringify(d, null, '\t')})
                            break
                        }
                    }
                }).catch((e) => {
                    setTimeout( () => {
                        this.getCmtTx(hash, txs)
                    }, 10000)
                })
            }
		}
    }
</script>




<style>
    .history {
        margin-top: 1.5rem;
    }
    .history .panel-heading {
        font-size: 0.9em;
        overflow: auto;
    }
    .history .panel-heading strong {
        float: right;
    }
</style>
