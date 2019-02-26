<template>
<div class="container">
    <section>
        <form @submit.prevent="sendTx">
            <b-field horizontal label="From">
                <b-input v-model="from" placeholder="0x"></b-input>
            </b-field>

            <b-field horizontal label="Password">
                <b-input type="password" v-model="password"></b-input>
            </b-field>

            <b-field horizontal label="PubKey">
                <b-input v-model="pubKey" placeholder=""></b-input>
            </b-field>

            <b-field horizontal label="MaxAmount">
                <b-input v-model="maxAmount" placeholder=""></b-input>
            </b-field>

            <b-field horizontal label="CompRate">
                <b-input v-model="compRate" placeholder="0.1"></b-input>
            </b-field>

            <b-field horizontal label="Name">
                <b-input v-model="name" placeholder=""></b-input>
            </b-field>

            <b-field horizontal label="Website">
                <b-input v-model="website" placeholder=""></b-input>
            </b-field>

            <b-field horizontal label="Location">
                <b-input v-model="location" placeholder=""></b-input>
            </b-field>

            <b-field horizontal label="Email">
                <b-input v-model="email" placeholder=""></b-input>
            </b-field>

            <b-field horizontal label="Profile">
                <b-input v-model="profile" placeholder=""></b-input>
            </b-field>

            <b-field horizontal>
                    <button type="submit" class="button is-primary" v-bind:disabled="waiting">
                    Update Validator
                    </button>
            </b-field>
        </form>
    </section>
    <section class="history">
        <nav class="panel" v-for="(tx, i) in txs" :key="tx.hash">
            <p class="panel-heading">
                <strong>{{i+1}}</strong> {{ tx.hash }}
            </p>
            <div class="panel-block">
                <pre>{{ tx.body }}</pre>
            </div>
        </nav>
    </section>
</div>
</template>

<script>
    import {Toast} from 'buefy/dist/components/toast'
    export default {
        data() {
            return {
                from: '',
                password: '',
                pubKey: '',
                compRate: '',
                maxAmount: '',
                name: '',
                website: '',
                email: '',
                location: '',
                profile: '',

                waiting: false,
                txs: []
            }
        },
        methods: {
            sendTx() {
                this.waiting = true
                this.$http.post('/update', {
                    from: this.from,
                    password: this.password,
                    pubKey: this.pubKey,
                    compRate: this.compRate,
                    maxAmount: this.maxAmount,
                    name: this.name,
                    website: this.website,
                    email: this.email,
                    location: this.location,
                    profile: this.profile
                })
                .then((response) => {
                    this.txs.push({hash:response.data})
                    this.waiting = false
                    this.getCmtTx(response.data)
                }).catch((error) => {
                    Toast.open({
                        type: 'is-danger',
                        position: 'is-bottom',
                        duration: 5000,
                        message: error.response.data
                    })
                    this.waiting = false
                })
            },
            getCmtTx(hash) {
                this.$parent.$parent.$parent.getCmtTx(hash, this.txs)
            }
        }
    }
</script>