class LocalGovernmentsController < ApplicationController
  def index
    @q = LocalGovernment.ransack(params[:q])
    @local_governments = @q.result.limit(25)
  end
end
